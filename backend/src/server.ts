// AscendQE Backend Server Entry Point
import fs from 'node:fs'
import path from 'node:path'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { config } from './config/index.js'
import { connectDatabase } from './config/database.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd()

// Ensure upload directory exists
try {
  fs.mkdirSync(config.uploadDir, { recursive: true })
} catch (e) {
  // Ignore if exists
}

// Works both from backend/src during development
// and backend/dist after the production build.
const frontendDistPath = path.resolve(
  currentDir,
  '../../frontend/dist'
)

// Allowed origins
const allowedOrigins = [
  config.corsOrigin,
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
]

// Security & Parsing Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.ascendqe.com') || origin === 'https://ascendqe.com') {
        callback(null, true)
      } else {
        callback(null, true) // Allow during development
      }
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static file serving for uploaded blog images
app.use('/uploads/blogs', express.static(config.uploadDir))

// Mount Central API Router
app.use('/api', apiRouter)

// Root welcome route
// Serve the production React frontend.
app.use(express.static(frontendDistPath))

// React Router fallback: send the frontend for website routes.
app.get('*', (req, res, next) => {
  // Don't return the React page for unknown API endpoints.
  if (req.path === '/api' || req.path.startsWith('/api/')) {
    return next()
  }

  res.sendFile(path.join(frontendDistPath, 'index.html'))
})

// Global Error Handler
app.use(errorHandler)

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port || 5000

// Start Server
async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`🚀 AscendQE Backend running on port ${port}`)
    console.log(`📡 API Health: http://localhost:${port}/api/health`)
  })
}

startServer().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

export default app

