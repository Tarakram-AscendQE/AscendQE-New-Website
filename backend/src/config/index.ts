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

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'ascendqe_dev_secret_key_2026',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  databaseUrl: process.env.DATABASE_URL || '',
  dbHost: process.env.DB_HOST || '184.168.113.192',
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  dbUser: process.env.DB_USER || 'ascendqe_admin',
  dbPassword: process.env.DB_PASSWORD || ']~4ueRo9XMAEYf-P',
  dbName: process.env.DB_NAME || 'ascendqe_blogs',
  uploadDir: process.env.UPLOAD_DIR || path.resolve(process.cwd(), '../frontend/public/uploads/blogs'),
  uploadBaseUrl: process.env.UPLOAD_BASE_URL || '/uploads/blogs',
  awsRegion: process.env.AWS_REGION || 'ap-south-1',
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  senderMail: process.env.SENDER_MAIL || 'hello@ascendqe.com',
  recipientMail: process.env.RECIPIENT_MAIL || 'hello@ascendqe.com',
}
