// Central API Router for AscendQE Backend
import { Router } from 'express'
import { authRouter } from './authRoutes.js'
import { blogRouter } from './blogRoutes.js'
import { uploadRouter } from './uploadRoutes.js'

export const apiRouter = Router()

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    service: 'AscendQE Blog & Admin API',
    status: 'healthy',
    timestamp: Date.now(),
  })
})

// Sub-routers
apiRouter.use('/auth', authRouter)
apiRouter.use('/blogs', blogRouter)
apiRouter.use('/upload', uploadRouter)

