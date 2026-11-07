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
import { handleContactEnquiry, handleJobApplication, resumeUpload } from './controllers/contactController.js'

const app = express()
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd()

// Ensure upload directory exists
try {
  fs.mkdirSync(config.uploadDir, { recursive: true })
} catch (e) {
  // Ignore if exists
}

// Locate static frontend assets (e.g. backend/public)
const candidatePublicPaths = [
  path.join(__dirname, 'public'),
  path.join(__dirname, '../public'),
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'backend/public'),
  path.resolve(__dirname, '../../frontend/dist'),
]

let publicDir = path.join(__dirname, 'public')
for (const p of candidatePublicPaths) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, 'index.html'))) {
    publicDir = p
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
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.ascendqe.com') || origin === 'https://ascendqe.com') {
        callback(null, true)
      } else {
        callback(null, true)
      }
    },
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Dedicated health check for hosting platforms (GoDaddy, AWS, Render)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Static file serving for uploaded blog images (serve from configured uploadDir and all public candidates)
const uploadStaticDirs = [
  config.uploadDir,
  path.join(publicDir, 'uploads/blogs'),
  path.resolve(process.cwd(), 'backend/public/uploads/blogs'),
  path.resolve(process.cwd(), 'public/uploads/blogs'),
  path.resolve(process.cwd(), 'frontend/public/uploads/blogs'),
  path.resolve(__dirname, '../public/uploads/blogs'),
]

for (const dir of Array.from(new Set(uploadStaticDirs))) {
  try {
    if (fs.existsSync(dir)) {
      app.use('/uploads/blogs', express.static(dir))
    }
  } catch {}
}

// Form submission endpoints (handles both /send-mail, /send-mail.php, /apply-job, and /apply-job.php)
app.post('/send-mail', handleContactEnquiry)
app.post('/send-mail.php', handleContactEnquiry)
app.post('/apply-job', resumeUpload.single('resume'), handleJobApplication)
app.post('/apply-job.php', resumeUpload.single('resume'), handleJobApplication)

// Mount Central API Router
app.use('/api', apiRouter)

// Serve the production React frontend from public folder
app.use(express.static(publicDir))

// React Router fallback: send the frontend for website routes
app.get('*', (req, res, next) => {
  if (req.path === '/api' || req.path.startsWith('/api/')) {
    return next()
  }

  const indexPath = path.join(publicDir, 'index.html')
  if (fs.existsSync(indexPath)) {
    let html = fs.readFileSync(indexPath, 'utf8')
    const pathname = req.path === '/' ? '/' : req.path.replace(/\/$/, '')
    html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/, `<link rel="canonical" href="https://ascendqe.com${pathname}" />`)
    if (pathname !== '/') {
      const socialSelectors = [
        'property="og:site_name"', 'property="og:url"', 'property="og:description"',
        'property="og:type"', 'property="og:image"', 'name="twitter:card"',
        'name="twitter:site"', 'name="twitter:creator"', 'name="twitter:title"',
        'name="twitter:description"', 'name="twitter:image"',
      ]
      socialSelectors.forEach((selector) => {
        html = html.replace(new RegExp(`<meta\\s+[^>]*${selector}[^>]*>`, 'gi'), '')
      })
    }
    res.type('html').send(html)
    return
  }

  res.status(200).send('AscendQE Application Server is active and healthy.')
})

// Global Error Handler
app.use(errorHandler)

// Bind strictly to process.env.PORT provided by the host platform (GoDaddy, Render, Heroku)
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port || 5000

// Listen on 0.0.0.0 immediately so platform health checks pass
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 AscendQE Server running on port ${port} (0.0.0.0)`)
  console.log(`📡 Health Check: http://localhost:${port}/health`)
  console.log(`📂 Serving Frontend from: ${publicDir}`)
})

// Connect to database in the background so slow connection doesn't block server startup
connectDatabase().catch((err: any) => {
  console.warn('[Database] Background connection error:', err?.message || err)
})

export default app
