// Central API Router for AscendQE Backend
import { Router } from 'express'
import { config } from '../config/index.js'
import { authRouter } from './authRoutes.js'
import { blogRouter } from './blogRoutes.js'
import { uploadRouter } from './uploadRoutes.js'
import { handleContactEnquiry, handleJobApplication, resumeUpload } from '../controllers/contactController.js'

export const apiRouter = Router()

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'AscendQE Blog & Admin API',
    status: 'healthy',
    emailConfigured: !!(config.awsAccessKeyId && config.awsSecretAccessKey),
    awsRegion: config.awsRegion,
    timestamp: Date.now(),
  })
})

// Diagnostic endpoint: reports only whether each integration is configured (no values or key names)
apiRouter.get('/debug-env', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    nodeEnv: config.nodeEnv,
    awsConfigured: !!(config.awsAccessKeyId && config.awsSecretAccessKey),
    databaseConfigured: !!(config.dbHost && config.dbUser),
    jwtSecretConfigured: !!process.env.JWT_SECRET,
  })
})

// Sub-routers
apiRouter.use('/auth', authRouter)
apiRouter.use('/blogs', blogRouter)
apiRouter.use('/upload', uploadRouter)

// Form submission endpoints
apiRouter.post('/send-mail', handleContactEnquiry)
apiRouter.post('/apply-job', resumeUpload.single('resume'), handleJobApplication)

