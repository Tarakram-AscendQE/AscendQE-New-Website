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

// Diagnostic endpoint to inspect environment variables securely (sensitive values are masked)
apiRouter.get('/debug-env', (_req, res) => {
  const envSummary: Record<string, any> = {}
  for (const [k, v] of Object.entries(process.env)) {
    const isSensitive = k.toUpperCase().includes('SECRET') || k.toUpperCase().includes('KEY') || k.toUpperCase().includes('PASS')
    envSummary[k] = {
      length: (v || '').length,
      hasValue: (v || '').length > 0,
      preview: isSensitive ? (v ? `${v.slice(0, 3)}...${v.slice(-2)}` : '') : v,
    }
  }

  res.status(200).json({
    status: 'ok',
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV,
    awsConfigured: !!(config.awsAccessKeyId && config.awsSecretAccessKey),
    detectedAwsKeyLength: config.awsAccessKeyId.length,
    detectedAwsSecretLength: config.awsSecretAccessKey.length,
    awsRegion: config.awsRegion,
    senderMail: config.senderMail,
    recipientMail: config.recipientMail,
    environmentKeys: Object.keys(process.env).sort(),
    environmentSummary: envSummary,
  })
})

// Sub-routers
apiRouter.use('/auth', authRouter)
apiRouter.use('/blogs', blogRouter)
apiRouter.use('/upload', uploadRouter)

// Form submission endpoints
apiRouter.post('/send-mail', handleContactEnquiry)
apiRouter.post('/apply-job', resumeUpload.single('resume'), handleJobApplication)

