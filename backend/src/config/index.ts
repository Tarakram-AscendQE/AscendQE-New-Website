// AscendQE Backend Application Configuration

import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

// Load environment variables reliably whether run from root or backend directory
const backendEnvPath = path.resolve(process.cwd(), 'backend/.env')
const cwdEnvPath = path.resolve(process.cwd(), '.env')

if (fs.existsSync(backendEnvPath)) {
  dotenv.config({ path: backendEnvPath })
} else if (fs.existsSync(cwdEnvPath)) {
  dotenv.config({ path: cwdEnvPath })
} else {
  dotenv.config()
}

// Detect if GoDaddy's hosting platform injected its default empty internal container DB (e.g. 10.x.x.x, db_*)
// Any connection not specifically targeting the `ascendqe_blogs` database or on an internal 10.x IP is redirected.
const isGoDaddyInternal = 
  !process.env.DB_HOST || 
  process.env.DB_HOST.startsWith('10.') || 
  process.env.DB_NAME?.startsWith('db_') ||
  process.env.DB_NAME !== 'ascendqe_blogs'

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'ascendqe_dev_secret_key_2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  databaseUrl: process.env.DATABASE_URL || '',
  dbHost: process.env.REMOTE_DB_HOST || (isGoDaddyInternal ? '184.168.113.192' : (process.env.DB_HOST || '184.168.113.192')),
  dbPort: parseInt(process.env.REMOTE_DB_PORT || (isGoDaddyInternal ? '3306' : (process.env.DB_PORT || '3306')), 10),
  dbUser: process.env.REMOTE_DB_USER || (isGoDaddyInternal ? 'ascendqe_admin' : (process.env.DB_USER || 'ascendqe_admin')),
  dbPassword: process.env.REMOTE_DB_PASSWORD || (isGoDaddyInternal ? ']~4ueRo9XMAEYf-P' : (process.env.DB_PASSWORD || ']~4ueRo9XMAEYf-P')),
  dbName: process.env.REMOTE_DB_NAME || (isGoDaddyInternal ? 'ascendqe_blogs' : (process.env.DB_NAME || 'ascendqe_blogs')),
  uploadDir: process.env.UPLOAD_DIR || path.resolve(process.cwd(), '../frontend/public/uploads/blogs'),
  uploadBaseUrl: process.env.UPLOAD_BASE_URL || '/uploads/blogs',
  awsRegion: process.env.AWS_REGION || 'ap-south-1',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  senderMail: process.env.SENDER_MAIL || 'hello@ascendqe.com',
  recipientMail: process.env.RECIPIENT_MAIL || 'hello@ascendqe.com',
}
