// AscendQE Backend Application Configuration

import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import dotenv from 'dotenv'

// Candidate paths to search for .env files in different container setups
const candidateEnvPaths = [
  path.resolve(process.cwd(), 'backend/.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../../.env'),
  '/app/.env',
  '/app/backend/.env',
]

for (const envPath of candidateEnvPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
  }
}
dotenv.config()

// Helper to retrieve an environment variable flexibly (case-insensitive and trimmed)
export function getEnvValue(name: string, fallback = ''): string {
  if (process.env[name] && process.env[name]!.trim()) {
    return process.env[name]!.trim()
  }

  const normalizedTarget = name.toLowerCase().replace(/[^a-z0-9]/g, '')
  for (const [key, value] of Object.entries(process.env)) {
    if (value && key.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedTarget) {
      return value.trim()
    }
  }

  return fallback
}

// JWT signing secret. Must come from the environment; if it is missing we use a random
// per-process secret so tokens can never be forged (sessions simply reset on restart).
function resolveJwtSecret(): string {
  const secret = getEnvValue('JWT_SECRET')
  if (secret) return secret
  console.warn('[Config] JWT_SECRET is not set. Using a temporary random secret; studio logins will reset on every restart.')
  return crypto.randomBytes(48).toString('hex')
}

// Safely resolve upload directory ensuring it exists within the application root
function resolveUploadDir(): string {
  const envUploadDir = process.env.UPLOAD_DIR
  if (envUploadDir) {
    const custom = path.resolve(envUploadDir)
    // Only use custom if it exists or can be created within project
    if (fs.existsSync(custom) && !custom.includes('../frontend')) {
      return custom
    }
  }

  // Potential directories that could serve static assets
  const candidates = [
    path.resolve(process.cwd(), 'backend/public/uploads/blogs'),
    path.resolve(process.cwd(), 'public/uploads/blogs'),
    path.resolve(__dirname, '../public/uploads/blogs'),
    path.resolve(__dirname, '../../public/uploads/blogs'),
    path.resolve(process.cwd(), 'frontend/public/uploads/blogs'),
    path.resolve(process.cwd(), 'uploads/blogs'),
  ]

  for (const c of candidates) {
    if (fs.existsSync(c)) {
      return c
    }
  }

  // If none exist yet, prioritize backend/public/uploads/blogs or public/uploads/blogs
  const preferred = fs.existsSync(path.resolve(process.cwd(), 'backend/public'))
    ? path.resolve(process.cwd(), 'backend/public/uploads/blogs')
    : path.resolve(process.cwd(), 'public/uploads/blogs')

  try {
    fs.mkdirSync(preferred, { recursive: true })
  } catch {}

  return preferred
}

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: getEnvValue('NODE_ENV', 'development'),
  jwtSecret: resolveJwtSecret(),
  jwtExpiresIn: getEnvValue('JWT_EXPIRES_IN', '7d'),
  corsOrigin: getEnvValue('CORS_ORIGIN', 'http://localhost:3001'),
  databaseUrl: getEnvValue('DATABASE_URL', ''),
  dbHost: getEnvValue('DB_HOST'),
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  dbUser: getEnvValue('DB_USER'),
  dbPassword: getEnvValue('DB_PASSWORD'),
  dbName: getEnvValue('DB_NAME', 'ascendqe_blogs'),
  uploadDir: resolveUploadDir(),
  uploadBaseUrl: process.env.UPLOAD_BASE_URL || '/uploads/blogs',
  awsRegion: getEnvValue('AWS_REGION', 'ap-south-1'),
  awsAccessKeyId: getEnvValue('AWS_ACCESS_KEY_ID'),
  awsSecretAccessKey: getEnvValue('AWS_SECRET_ACCESS_KEY'),
  senderMail: getEnvValue('SENDER_MAIL', 'hello@ascendqe.com'),
  recipientMail: getEnvValue('RECIPIENT_MAIL', 'hello@ascendqe.com'),
}
