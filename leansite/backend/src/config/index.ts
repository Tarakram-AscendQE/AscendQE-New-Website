// Backend configuration. Every environment variable is read here, nowhere else.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Local development reads leansite/backend/.env; in production GoDaddy provides the variables.
const candidateEnvPaths = [path.resolve(__dirname, '../../.env'), path.resolve(process.cwd(), '.env')];
for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) dotenv.config({ path: envPath });
}

/** Reads an environment variable, trimmed. The name match ignores case and separators (GoDaddy-friendly). */
function getEnvValue(name: string, fallback = ''): string {
  const exact = process.env[name]?.trim();
  if (exact) return exact;

  const normalizedTarget = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [key, value] of Object.entries(process.env)) {
    if (value?.trim() && key.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedTarget) return value.trim();
  }
  return fallback;
}

/**
 * JWT signing secret for the Insights studio. Without JWT_SECRET a random per-process secret is used,
 * so tokens can never be forged (studio sessions simply end on every restart).
 */
function resolveJwtSecret(): string {
  const secret = getEnvValue('JWT_SECRET');
  if (secret) return secret;
  console.warn('[Config] JWT_SECRET is not set; using a temporary secret (studio logins reset on restart).');
  return crypto.randomBytes(48).toString('hex');
}

/** leansite/backend (same depth from src/config and dist/config). */
const BACKEND_ROOT = path.resolve(__dirname, '../..');

export const config = {
  port: Number(getEnvValue('PORT')) || 5000,
  nodeEnv: getEnvValue('NODE_ENV', 'development'),
  siteOrigin: 'https://ascendqe.com',
  /** The React build served by this server (leansite/frontend/dist). */
  frontendDistDir: path.resolve(BACKEND_ROOT, '../frontend/dist'),
  email: {
    awsRegion: getEnvValue('AWS_REGION', 'ap-south-1'),
    awsAccessKeyId: getEnvValue('AWS_ACCESS_KEY_ID'),
    awsSecretAccessKey: getEnvValue('AWS_SECRET_ACCESS_KEY'),
    senderMail: getEnvValue('SENDER_MAIL', 'hello@ascendqe.com'),
    recipientMail: getEnvValue('RECIPIENT_MAIL', 'hello@ascendqe.com'),
  },
  /** MySQL database holding the Insights articles and studio users. */
  database: {
    host: getEnvValue('DB_HOST'),
    port: Number(getEnvValue('DB_PORT')) || 3306,
    user: getEnvValue('DB_USER'),
    password: getEnvValue('DB_PASSWORD'),
    name: getEnvValue('DB_NAME', 'ascendqe_blogs'),
  },
  auth: {
    jwtSecret: resolveJwtSecret(),
    jwtExpiresIn: getEnvValue('JWT_EXPIRES_IN', '7d'),
  },
  /** Local disk storage for article images (used when object storage is not configured). */
  uploads: {
    dir: path.resolve(BACKEND_ROOT, getEnvValue('UPLOAD_DIR', 'public/uploads/blogs')),
    baseUrl: '/uploads/blogs',
  },
  // S3-compatible storage for article images (Cloudflare R2 now, AWS S3 later: only these values change).
  // When unset, uploads go to local disk, which is wiped on every GoDaddy deploy.
  storage: {
    endpoint: getEnvValue('STORAGE_ENDPOINT'),
    region: getEnvValue('STORAGE_REGION', 'auto'),
    bucket: getEnvValue('STORAGE_BUCKET'),
    accessKeyId: getEnvValue('STORAGE_ACCESS_KEY_ID'),
    secretAccessKey: getEnvValue('STORAGE_SECRET_ACCESS_KEY'),
    publicUrl: getEnvValue('STORAGE_PUBLIC_URL'),
  },
};

export function isEmailConfigured(): boolean {
  return Boolean(config.email.awsAccessKeyId && config.email.awsSecretAccessKey);
}

export function isDatabaseConfigured(): boolean {
  return Boolean(config.database.host && config.database.user);
}
