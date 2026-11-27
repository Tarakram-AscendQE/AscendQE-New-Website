// AWS Signature Version 4 helpers (zero-dependency), shared by SES email and S3-compatible storage.
import crypto from 'node:crypto';

export function sha256Hex(data: string | Buffer): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function calculateAwsSigV4Key(
  secretKey: string,
  dateStamp: string,
  regionName: string,
  serviceName: string
): Buffer {
  const kSecret = Buffer.from('AWS4' + secretKey, 'utf8');
  const kDate = crypto.createHmac('sha256', kSecret).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  return crypto.createHmac('sha256', kService).update('aws4_request').digest();
}

export interface SigV4Request {
  method: string;
  canonicalUri: string;
  /** Lower-case header names; must include `host` and `x-amz-date`. All of them are signed. */
  headers: Record<string, string>;
  payloadHash: string;
  region: string;
  service: string;
  accessKeyId: string;
  secretAccessKey: string;
  /** Format: YYYYMMDDTHHMMSSZ */
  amzDate: string;
}

/** Builds the `Authorization` header value for a request without a query string. */
export function buildSigV4Authorization(req: SigV4Request): string {
  const names = Object.keys(req.headers).sort();
  const canonicalHeaders = names.map((name) => `${name}:${req.headers[name].trim()}\n`).join('');
  const signedHeaders = names.join(';');
  const canonicalRequest = [req.method, req.canonicalUri, '', canonicalHeaders, signedHeaders, req.payloadHash].join(
    '\n'
  );

  const dateStamp = req.amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${req.region}/${req.service}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', req.amzDate, credentialScope, sha256Hex(canonicalRequest)].join('\n');
  const signingKey = calculateAwsSigV4Key(req.secretAccessKey, dateStamp, req.region, req.service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  return `AWS4-HMAC-SHA256 Credential=${req.accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}
