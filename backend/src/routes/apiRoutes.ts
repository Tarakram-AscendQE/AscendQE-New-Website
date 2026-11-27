// /api routes: health check, email (form) endpoints and the Insights module (articles, studio auth, uploads).
import { Router } from 'express';
import { isDatabaseConfigured, isEmailConfigured } from '../config/index.js';
import { getMe, login, logout } from '../controllers/authController.js';
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../controllers/blogController.js';
import { handleContactEnquiry, handleJobApplication, resumeUpload } from '../controllers/contactController.js';
import { imageUpload, uploadImage } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { isObjectStorageConfigured } from '../services/storageService.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'healthy',
    data: {
      emailConfigured: isEmailConfigured(),
      databaseConfigured: isDatabaseConfigured(),
      imageStorageConfigured: isObjectStorageConfigured(),
    },
    timestamp: Date.now(),
  });
});

// Forms (email)
apiRouter.post('/send-mail', handleContactEnquiry);
apiRouter.post('/apply-job', resumeUpload.single('resume'), handleJobApplication);

// Insights studio sign-in
apiRouter.post('/auth/login', login);
apiRouter.post('/auth/logout', logout);
apiRouter.get('/auth/me', requireAuth, getMe);

// Insights articles: public reads, studio-only writes
apiRouter.get('/blogs', getBlogs);
apiRouter.get('/blogs/:idOrSlug', getBlog);
apiRouter.post('/blogs', requireAuth, createBlog);
apiRouter.put('/blogs/:id', requireAuth, updateBlog);
apiRouter.delete('/blogs/:id', requireAuth, deleteBlog);

// Article images (studio only)
apiRouter.post('/upload', requireAuth, imageUpload.single('image'), uploadImage);
