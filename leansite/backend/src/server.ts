// AscendQE Lean site server (used by `npm start` on GoDaddy): the email API under /api and the React build.
import express from 'express';
import { config, isEmailConfigured } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRouter } from './routes/apiRoutes.js';
import { siteRouter } from './routes/siteRoutes.js';

const app = express();
app.disable('x-powered-by');

app.use((_req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'SAMEORIGIN',
  });
  next();
});

// Health check for the hosting platform.
app.get('/health', (_req, res) => {
  res.set('Cache-Control', 'no-store').json({ status: 'healthy' });
});

app.use('/api', express.json({ limit: '1mb' }), express.urlencoded({ extended: true, limit: '1mb' }), apiRouter);
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'Not Found', timestamp: Date.now() });
});

app.use(siteRouter);
app.use(errorHandler);

app.listen(config.port, '0.0.0.0', () => {
  console.warn(`AscendQE Lean site running on port ${config.port} (serving ${config.frontendDistDir})`);
  if (!isEmailConfigured()) console.warn('[Email] AWS SES credentials are not set; form emails will fail.');
});
