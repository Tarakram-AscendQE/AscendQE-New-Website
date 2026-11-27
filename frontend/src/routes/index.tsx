import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { SiteLayout } from '@/layouts/SiteLayout';
import { ArticleRedirect } from '@/routes/ArticleRedirect';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { CookiePolicyPage } from '@/pages/CookiePolicyPage';
import { GccPage } from '@/pages/GccPage';
import { HomePage } from '@/pages/HomePage';
import { InsightsPage } from '@/pages/InsightsPage';
import { MethodPage } from '@/pages/MethodPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { StandardPage } from '@/pages/StandardPage';
import { StartPage } from '@/pages/StartPage';
import { TermsOfServicePage } from '@/pages/TermsOfServicePage';

/** The `.html` file names used by the static version of this site → their React routes. */
const HTML_ALIASES: Record<string, string> = {
  'index.html': '/',
  'services.html': '/services',
  'gcc.html': '/gcc',
  'method.html': '/method',
  'about.html': '/about',
  'standard.html': '/standard',
  'start.html': '/start',
};

const aliasRoutes: RouteObject[] = Object.entries(HTML_ALIASES).map(([path, to]) => ({
  path,
  element: <Navigate to={to} replace />,
}));

/** Previous site's studio URLs → /studio. */
const studioAliasRoutes: RouteObject[] = ['/blogs/login', '/blog/login', '/blog-login', '/admin/blogs'].map((path) => ({
  path,
  element: <Navigate to="/studio" replace />,
}));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'gcc', element: <GccPage /> },
      { path: 'method', element: <MethodPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'standard', element: <StandardPage /> },
      { path: 'start', element: <StartPage /> },
      { path: 'contact', element: <ContactPage /> },
      // Insights: the article page (TipTap) loads on demand
      { path: 'blogs', element: <InsightsPage /> },
      {
        path: 'blogs/:slug',
        lazy: async () => ({ Component: (await import('@/pages/ArticlePage')).ArticlePage }),
      },
      { path: 'blog', element: <Navigate to="/blogs" replace /> },
      { path: 'blog/:slug', element: <ArticleRedirect /> },
      { path: 'article/:slug', element: <ArticleRedirect /> },
      // Legal (old URL variants redirect)
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'cookie-policy', element: <CookiePolicyPage /> },
      { path: 'privacy-policy', element: <Navigate to="/privacy" replace /> },
      { path: 'terms-of-service', element: <Navigate to="/terms" replace /> },
      { path: 'terms-and-conditions', element: <Navigate to="/terms" replace /> },
      ...aliasRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  // Insights studio (own layout, not linked from the site); loads on demand
  { path: '/studio', lazy: async () => ({ Component: (await import('@/pages/StudioPage')).StudioPage }) },
  ...studioAliasRoutes,
]);
