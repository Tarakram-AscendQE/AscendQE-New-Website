// Breadcrumb labels for every site page (the home page has none). Keep in sync with routes/index.tsx.

export interface Crumb {
  label: string;
  /** Missing on the current page (it is not a link). */
  to?: string;
}

/** Page path → label. A page's parent is the path one segment up (e.g. /blogs/x → /blogs). */
export const BREADCRUMB_LABELS: Record<string, string> = {
  '/services': 'What we do',
  '/gcc': 'For GCC leaders',
  '/method': 'How we decide',
  '/about': 'About',
  '/standard': 'The Proof Standard',
  '/start': 'Start a Proof Sprint',
  '/contact': 'Contact us',
  '/blogs': 'Insights',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Service',
  '/cookie-policy': 'Cookie Policy',
};

const NOT_FOUND_LABEL = 'Page not found';
const ARTICLE_FALLBACK_LABEL = 'Article';

/**
 * Trail for a path: Home, then each known parent, then the page itself.
 * `pageLabel` names pages whose label comes from their content (an article title).
 */
export function breadcrumbTrail(pathname: string, pageLabel: string | null): Crumb[] {
  if (pathname === '/') return [];
  const segments = pathname.split('/').filter(Boolean);
  const trail: Crumb[] = [{ label: 'Home', to: '/' }];

  segments.forEach((_, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    const label =
      BREADCRUMB_LABELS[path] ??
      (isLast && path.startsWith('/blogs/') ? pageLabel || ARTICLE_FALLBACK_LABEL : isLast ? NOT_FOUND_LABEL : null);
    if (label) trail.push(isLast ? { label } : { label, to: path });
  });
  return trail;
}
