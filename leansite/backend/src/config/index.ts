// Backend configuration. Every environment variable is read here, nowhere else.
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

export const config = {
  port: Number(getEnvValue('PORT')) || 5000,
  nodeEnv: getEnvValue('NODE_ENV', 'development'),
  siteOrigin: 'https://ascendqe.com',
  /** The React build served by this server (leansite/frontend/dist). Same depth from src/ and dist/. */
  frontendDistDir: path.resolve(__dirname, '../../../frontend/dist'),
  email: {
    awsRegion: getEnvValue('AWS_REGION', 'ap-south-1'),
    awsAccessKeyId: getEnvValue('AWS_ACCESS_KEY_ID'),
    awsSecretAccessKey: getEnvValue('AWS_SECRET_ACCESS_KEY'),
    senderMail: getEnvValue('SENDER_MAIL', 'hello@ascendqe.com'),
    recipientMail: getEnvValue('RECIPIENT_MAIL', 'hello@ascendqe.com'),
  },
};

export function isEmailConfigured(): boolean {
  return Boolean(config.email.awsAccessKeyId && config.email.awsSecretAccessKey);
}
