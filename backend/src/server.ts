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

// Locate frontend dist folder with multiple candidate paths for dev, monorepo, and production containers
const candidateDistPaths = [
  path.resolve(currentDir, '../../frontend/dist'),
  path.resolve(currentDir, '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), '../frontend/dist'),
  path.resolve(process.cwd(), 'dist'),
]

let frontendDistPath = candidateDistPaths[0]
for (const p of candidateDistPaths) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
    frontendDistPath = p
    break
  }
}

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

// Dedicated root health check for hosting platforms (GoDaddy, AWS, Render)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Static file serving for uploaded blog images
app.use('/uploads/blogs', express.static(config.uploadDir))

// Mount Central API Router
app.use('/api', apiRouter)

// Serve the production React frontend
app.use(express.static(frontendDistPath))

// React Router fallback: send the frontend for website routes
app.get('*', (req, res, next) => {
  // Don't return the React page for unknown API endpoints
  if (req.path === '/api' || req.path.startsWith('/api/')) {
    return next()
  }

  const indexPath = path.join(frontendDistPath, 'index.html')
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath)
  }

  // Safe fallback response if static build is pending so health checks never fail
  res.status(200).send('AscendQE Application Server is active and healthy.')
})

// Global Error Handler
app.use(errorHandler)

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port || 5000

// Start listening immediately on 0.0.0.0 so platform health checks pass within milliseconds
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 AscendQE Server running on port ${port} (0.0.0.0)`)
  console.log(`📡 Health Check: http://localhost:${port}/health`)
  console.log(`📂 Serving Frontend from: ${frontendDistPath}`)
})

// Connect to database in the background so a slow DB handshake never blocks server startup
connectDatabase().catch((err: any) => {
  console.warn('[Database] Background connection error:', err?.message || err)
})

export default app
