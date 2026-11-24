// Production server for the Lean site (used by `npm start` on GoDaddy). Zero dependencies.
//
// - Serves the Vite build in ./dist on process.env.PORT.
// - Page routes return index.html (the React router renders the page), with the canonical URL
//   set for that route so crawlers see the right one without running JavaScript.
// - Old URLs (previous site, *.html names) get a permanent redirect to the closest page.
// - Unknown pages return index.html with status 404 (the app shows its "Page not found" screen).
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 3000;
const SITE_ORIGIN = 'https://ascendqe.com';

/** Routes defined in src/routes/index.tsx. */
const PAGE_ROUTES = new Set(['/', '/services', '/gcc', '/method', '/about', '/standard', '/start']);

/** Old URL → current page (permanent redirects). */
const REDIRECTS = {
  '/index.html': '/',
  '/services.html': '/services',
  '/gcc.html': '/gcc',
  '/method.html': '/method',
  '/about.html': '/about',
  '/standard.html': '/standard',
  '/start.html': '/start',
  // Previous ascendqe.com site
  '/about-us': '/about',
  '/proof': '/method',
  '/proof.html': '/method',
  '/how-it-works': '/method',
  '/docs': '/standard',
  '/docs.html': '/standard',
  '/reference': '/standard',
  '/reference.html': '/standard',
  '/contact': '/start',
  '/pricing': '/start',
  '/pricing.html': '/start',
  '/payoff': '/services',
  '/payoff.html': '/services',
  '/calculator': '/services',
  '/platform': '/services',
  '/mydiya': '/services',
  '/mystlc': '/services',
  '/mysdet': '/services',
  '/mytevv': '/services',
  '/myp95': '/services',
  '/myut': '/services',
  '/mytdm': '/services',
  '/finopshub': '/services',
  '/finopshub.live': '/services',
  '/prcheck': '/services',
  '/prcheck.live': '/services',
};
const REDIRECT_PREFIXES = [['/products/', '/services']];

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
};

const indexHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

function send(req, res, status, headers, body) {
  res.writeHead(status, { ...SECURITY_HEADERS, ...headers });
  res.end(req.method === 'HEAD' ? undefined : body);
}

/** index.html with the canonical URL of this page (none on "Page not found", which is also noindex). */
function sendPage(req, res, status, pathname) {
  const canonical = status === 200 ? `<link rel="canonical" href="${SITE_ORIGIN}${pathname}" />` : '';
  const html = indexHtml.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, canonical);
  send(req, res, status, { 'Content-Type': CONTENT_TYPES['.html'], 'Cache-Control': 'no-cache' }, html);
}

/** Resolves a URL path to a file inside dist/, or null (also blocks ../ traversal). */
function resolveFile(pathname) {
  const filePath = path.normalize(path.join(DIST_DIR, pathname));
  if (!filePath.startsWith(DIST_DIR + path.sep)) return null;
  try {
    return fs.statSync(filePath).isFile() ? filePath : null;
  } catch {
    return null;
  }
}

function redirectTarget(pathname) {
  const lower = pathname.toLowerCase();
  if (REDIRECTS[lower]) return REDIRECTS[lower];
  for (const [prefix, to] of REDIRECT_PREFIXES) if (lower.startsWith(prefix)) return to;
  return null;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(req, res, 405, { Allow: 'GET, HEAD', 'Content-Type': CONTENT_TYPES['.txt'] }, 'Method Not Allowed');
    return;
  }

  let url;
  let pathname;
  try {
    url = new URL(req.url ?? '/', 'http://localhost');
    pathname = decodeURIComponent(url.pathname);
  } catch {
    send(req, res, 400, { 'Content-Type': CONTENT_TYPES['.txt'] }, 'Bad Request');
    return;
  }

  if (pathname === '/health') {
    send(
      req,
      res,
      200,
      { 'Content-Type': CONTENT_TYPES['.json'], 'Cache-Control': 'no-store' },
      '{"status":"healthy"}'
    );
    return;
  }

  // Trailing slash → canonical form (except the home page).
  if (pathname.length > 1 && pathname.endsWith('/')) {
    send(req, res, 301, { Location: pathname.replace(/\/+$/, '') + url.search }, '');
    return;
  }

  const target = redirectTarget(pathname);
  if (target) {
    send(req, res, 301, { Location: target + url.search }, '');
    return;
  }

  if (PAGE_ROUTES.has(pathname)) {
    sendPage(req, res, 200, pathname);
    return;
  }

  const filePath = resolveFile(pathname);
  if (filePath) {
    const ext = path.extname(filePath).toLowerCase();
    // Vite puts content-hashed files in /assets, so they can be cached forever.
    const cacheControl = pathname.startsWith('/assets/')
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600';
    send(
      req,
      res,
      200,
      { 'Content-Type': CONTENT_TYPES[ext] ?? 'application/octet-stream', 'Cache-Control': cacheControl },
      fs.readFileSync(filePath)
    );
    return;
  }

  // Missing file (has an extension) → plain 404; anything else → the app's "Page not found" page.
  if (path.extname(pathname)) {
    send(req, res, 404, { 'Content-Type': CONTENT_TYPES['.txt'] }, 'Not Found');
    return;
  }
  sendPage(req, res, 404, pathname);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AscendQE Lean site running on port ${PORT} (serving ${DIST_DIR})`);
});
