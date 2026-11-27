import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import pageSeo from './src/data/pageSeo.json';

const SITE_ORIGIN = 'https://ascendqe.com';

function routePathname(requestUrl: string | undefined): string {
  const pathname = new URL(requestUrl ?? '/', 'http://localhost').pathname;
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
}

function escapeHtmlAttribute(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

function setMetaContent(html: string, attribute: 'name' | 'property', key: string, content: string): string {
  const tag = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
  if (!tag.test(html)) throw new Error(`Missing ${attribute}="${key}" metadata in frontend/index.html`);
  return html.replace(tag, `<meta ${attribute}="${key}" content="${escapeHtmlAttribute(content)}">`);
}

function applyPageSeo(html: string, page: (typeof pageSeo)[keyof typeof pageSeo]): string {
  const titleTag = /<title>[\s\S]*?<\/title>/i;
  const canonicalTag = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i;

  if (!titleTag.test(html)) throw new Error('Missing title metadata in frontend/index.html');
  if (!canonicalTag.test(html)) throw new Error('Missing canonical metadata in frontend/index.html');

  let result = html
    .replace(titleTag, `<title>${escapeHtmlAttribute(page.title)}</title>`)
    .replace(canonicalTag, `<link rel="canonical" href="${SITE_ORIGIN}${page.canonicalPath}">`);
  result = setMetaContent(result, 'name', 'description', page.description);
  result = setMetaContent(result, 'property', 'og:description', page.description);
  result = setMetaContent(result, 'name', 'twitter:description', page.description);
  return result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${SITE_ORIGIN}${page.canonicalPath}">`,
  );
}

function routeSeoPlugin(): Plugin {
  return {
    name: 'route-specific-html-seo',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        if (request.method !== 'GET' && request.method !== 'HEAD') return next();

        const requestUrl = request.url ?? '/';
        const pathname = routePathname(requestUrl);
        if (!pageSeo[pathname as keyof typeof pageSeo]) return next();

        const indexPath = path.resolve(__dirname, 'index.html');
        fs.readFile(indexPath, 'utf8', (error, html) => {
          if (error) return next(error);
          void server
            .transformIndexHtml(requestUrl, html, request.originalUrl)
            .then((transformedHtml) => {
              response.statusCode = 200;
              response.setHeader('Content-Type', 'text/html; charset=utf-8');
              response.end(request.method === 'HEAD' ? undefined : transformedHtml);
            })
            .catch(next);
        });
      });
    },
    transformIndexHtml(html, context) {
      const pathname = routePathname(context.originalUrl ?? context.path);
      const page = pageSeo[pathname as keyof typeof pageSeo];
      return page ? applyPageSeo(html, page) : html;
    },
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = routePathname(request.url);
        const page = pageSeo[pathname as keyof typeof pageSeo];
        if (!page) return next();

        const routeIndexPath = path.join(__dirname, 'dist', pathname.slice(1), 'index.html');
        fs.readFile(routeIndexPath, 'utf8', (error, html) => {
          if (error) return next(error);
          response.statusCode = 200;
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(request.method === 'HEAD' ? undefined : html);
        });
      });
    },
    closeBundle() {
      const outputDirectory = path.resolve(__dirname, 'dist');
      const indexPath = path.join(outputDirectory, 'index.html');
      const html = fs.readFileSync(indexPath, 'utf8');

      Object.entries(pageSeo).forEach(([route, page]) => {
        if (route === '/') return;
        const routeIndexPath = path.join(outputDirectory, route.slice(1), 'index.html');
        fs.mkdirSync(path.dirname(routeIndexPath), { recursive: true });
        fs.writeFileSync(routeIndexPath, applyPageSeo(html, page), 'utf8');
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), routeSeoPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3001,
    // The backend (backend/, `npm run dev` there) answers /api and serves article images on :5000.
    proxy: {
      '/api': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
});
