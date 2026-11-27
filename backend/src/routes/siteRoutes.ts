// Serves the React build (frontend/dist): page routes (incl. Insights articles), old-URL redirects,
// static files and 404s.
import fs from 'node:fs';
import path from 'node:path';
import express, { Router, type Request, type Response } from 'express';
import { config } from '../config/index.js';
import { ARTICLE_PREFIXES, ARTICLE_ROUTE, PAGE_ROUTES, REDIRECT_PREFIXES, REDIRECTS } from '../config/siteRoutes.js';

export const siteRouter = Router();

const INDEX_PATH = path.join(config.frontendDistDir, 'index.html');
let indexHtmlCache: string | null = null;

/** index.html of the build, read once. null when the frontend has not been built yet. */
function readIndexHtml(): string | null {
  if (indexHtmlCache === null && fs.existsSync(INDEX_PATH)) indexHtmlCache = fs.readFileSync(INDEX_PATH, 'utf8');
  return indexHtmlCache;
}

/** index.html with this page's canonical URL (none on "Page not found", which is also noindex). */
function sendPage(res: Response, status: number, pathname: string): void {
  const indexHtml = readIndexHtml();
  if (!indexHtml) {
    res.status(503).type('text/plain').send('Frontend not built. Run `npm run build` (or use the Vite dev server).');
    return;
  }
  const canonical = status === 200 ? `<link rel="canonical" href="${config.siteOrigin}${pathname}" />` : '';
  const html = indexHtml.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, canonical);
  res.status(status).set('Cache-Control', 'no-cache').type('html').send(html);
}

function redirectTarget(pathname: string): string | null {
  const lower = pathname.toLowerCase();
  if (REDIRECTS[lower]) return REDIRECTS[lower];
  const articlePrefix = ARTICLE_PREFIXES.find((from) => lower.startsWith(from));
  if (articlePrefix) return `/blogs/${pathname.slice(articlePrefix.length)}`;
  const prefix = REDIRECT_PREFIXES.find(([from]) => lower.startsWith(from));
  return prefix ? prefix[1] : null;
}

function querySuffix(req: Request): string {
  const index = req.originalUrl.indexOf('?');
  return index === -1 ? '' : req.originalUrl.slice(index);
}

siteRouter.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).set('Allow', 'GET, HEAD').type('text/plain').send('Method Not Allowed');
    return;
  }

  let pathname: string;
  try {
    pathname = decodeURIComponent(req.path);
  } catch {
    res.status(400).type('text/plain').send('Bad Request');
    return;
  }

  // Trailing slash → canonical form (except the home page).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.redirect(301, pathname.replace(/\/+$/, '') + querySuffix(req));
    return;
  }

  const target = redirectTarget(pathname);
  if (target) {
    res.redirect(301, target + querySuffix(req));
    return;
  }

  if (PAGE_ROUTES.has(pathname) || ARTICLE_ROUTE.test(pathname)) {
    sendPage(res, 200, pathname);
    return;
  }
  next();
});

// Vite puts content-hashed files in /assets, so they can be cached forever.
siteRouter.use(
  express.static(config.frontendDistDir, {
    index: false,
    redirect: false,
    setHeaders: (res, filePath) => {
      const isHashedAsset = filePath.startsWith(path.join(config.frontendDistDir, 'assets') + path.sep);
      res.setHeader('Cache-Control', isHashedAsset ? 'public, max-age=31536000, immutable' : 'public, max-age=3600');
    },
  })
);

// Missing file (has an extension) → plain 404; anything else → the app's "Page not found" page.
siteRouter.use((req, res) => {
  if (path.extname(req.path)) {
    res.status(404).type('text/plain').send('Not Found');
    return;
  }
  sendPage(res, 404, req.path);
});
