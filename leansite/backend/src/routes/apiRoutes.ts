// /api routes: health check and the email (form) endpoints.
import { Router } from 'express';
import { isEmailConfigured } from '../config/index.js';
import { handleContactEnquiry, handleJobApplication, resumeUpload } from '../controllers/contactController.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'healthy',
    data: { emailConfigured: isEmailConfigured() },
    timestamp: Date.now(),
  });
});

apiRouter.post('/send-mail', handleContactEnquiry);
apiRouter.post('/apply-job', resumeUpload.single('resume'), handleJobApplication);
