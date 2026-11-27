// Website URLs served by the backend. Keep PAGE_ROUTES in sync with frontend/src/routes/index.tsx.

/** Page routes: answered with index.html (status 200) and the page's canonical URL. */
export const PAGE_ROUTES = new Set([
  '/',
  '/services',
  '/gcc',
  '/method',
  '/about',
  '/standard',
  '/start',
  '/blogs',
  '/studio',
  '/privacy',
  '/terms',
  '/cookie-policy',
]);

/** Insights article pages (/blogs/<slug>): index.html with a canonical URL; the app loads the article. */
export const ARTICLE_ROUTE = /^\/blogs\/[\w-]+$/;

/** Old URL (lower-case) → current page, as permanent redirects. */
export const REDIRECTS: Record<string, string> = {
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
  // Insights (previous site's blog and studio URLs)
  '/blog': '/blogs',
  '/blog/login': '/studio',
  '/blogs/login': '/studio',
  '/blog-login': '/studio',
  '/admin/blogs': '/studio',
  // Legal (previous site's URL variants)
  '/privacy-policy': '/privacy',
  '/terms-of-service': '/terms',
  '/terms-and-conditions': '/terms',
};

/** Old URL prefixes → current page. */
export const REDIRECT_PREFIXES: [string, string][] = [['/products/', '/services']];

/** Old article URL prefixes → /blogs/, keeping the slug (/blog/x and /article/x → /blogs/x). */
export const ARTICLE_PREFIXES = ['/blog/', '/article/'];
