// AscendQE Lean site server (used by `npm start` on GoDaddy): the API under /api, article images under
// /uploads/blogs, and the React build for everything else.
import express from 'express';
import { config, isEmailConfigured } from './config/index.js';
import { connectDatabase } from './config/database.js';
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

// Article content can carry compressed images (data URLs) when an image upload fails, hence 10 MB.
app.use('/api', express.json({ limit: '10mb' }), express.urlencoded({ extended: true, limit: '1mb' }), apiRouter);
app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'Not Found', timestamp: Date.now() });
});

// Article images stored on local disk (when R2/S3 is not configured). Missing images are a plain 404.
// Browsers revalidate every time (ETag → 304 when unchanged), so a cover replaced under the same file name
// shows up at once instead of after a 30-day cache.
app.use(
  config.uploads.baseUrl,
  express.static(config.uploads.dir, {
    index: false,
    redirect: false,
    fallthrough: false,
    setHeaders: (res) => res.setHeader('Cache-Control', 'no-cache'),
  })
);

app.use(siteRouter);
app.use(errorHandler);

app.listen(config.port, '0.0.0.0', () => {
  console.warn(`AscendQE Lean site running on port ${config.port} (serving ${config.frontendDistDir})`);
  if (!isEmailConfigured()) console.warn('[Email] AWS SES credentials are not set; form emails will fail.');
});

// Connect in the background so a slow database never delays startup or health checks.
void connectDatabase();
