// Article image storage.
// Uses S3-compatible object storage when STORAGE_* is configured (Cloudflare R2 today, AWS S3 later; switching
// only changes env values). Without it, images go to local disk, which is fine for development but is wiped
// on every GoDaddy deploy.
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { config } from '../config/index.js';
import { buildSigV4Authorization, sha256Hex } from './awsSignature.js';

export function isObjectStorageConfigured(): boolean {
  const { endpoint, bucket, accessKeyId, secretAccessKey, publicUrl } = config.storage;
  return Boolean(endpoint && bucket && accessKeyId && secretAccessKey && publicUrl);
}

function putObject(key: string, body: Buffer, contentType: string): Promise<void> {
  const { endpoint, region, bucket, accessKeyId, secretAccessKey } = config.storage;
  // Path-style URL (https://<endpoint>/<bucket>/<key>) works for both R2 and S3.
  const url = new URL(`${endpoint.replace(/\/+$/, '')}/${bucket}/${key}`);
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const payloadHash = sha256Hex(body);

  const headers: Record<string, string> = {
    'cache-control': 'public, max-age=31536000, immutable',
    'content-type': contentType,
    host: url.host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  const authorization = buildSigV4Authorization({
    method: 'PUT',
    canonicalUri: url.pathname,
    headers,
    payloadHash,
    region,
    service: 's3',
    accessKeyId,
    secretAccessKey,
    amzDate,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: 'PUT', headers: { ...headers, authorization, 'content-length': body.length } },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve();
          } else {
            console.error(`[Storage] Upload failed (${res.statusCode}): ${responseBody.slice(0, 500)}`);
            reject(new Error(`Image storage rejected the upload (HTTP ${res.statusCode}).`));
          }
        });
      }
    );
    req.on('error', reject);
    req.end(body);
  });
}

/** Stores an article image and returns the public URL to save in the database. */
export async function saveBlogImage(buffer: Buffer, filename: string, contentType: string): Promise<string> {
  if (isObjectStorageConfigured()) {
    const key = `blogs/${filename}`;
    await putObject(key, buffer, contentType);
    return `${config.storage.publicUrl.replace(/\/+$/, '')}/${key}`;
  }

  await fs.promises.mkdir(config.uploads.dir, { recursive: true });
  await fs.promises.writeFile(path.join(config.uploads.dir, filename), buffer);
  return `${config.uploads.baseUrl}/${filename}`;
}

const LOCAL_IMAGE_PATTERN = /\/uploads\/blogs\/([\w.-]+\.(?:png|jpe?g|webp|gif|svg))/gi;

/** Deletes the locally stored images an article uses (cover + inline). Object-storage images are kept. */
export async function deleteLocalArticleImages(coverImageUrl: string | null, content: string): Promise<number> {
  const filenames = new Set<string>();
  for (const source of [coverImageUrl ?? '', content]) {
    for (const match of source.matchAll(LOCAL_IMAGE_PATTERN)) filenames.add(path.basename(match[1]));
  }

  let deleted = 0;
  for (const filename of filenames) {
    try {
      await fs.promises.unlink(path.join(config.uploads.dir, filename));
      deleted++;
    } catch {
      // Already gone (e.g. after a redeploy) or never stored locally.
    }
  }
  return deleted;
}
