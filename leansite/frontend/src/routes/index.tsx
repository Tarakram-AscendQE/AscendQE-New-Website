import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { SiteLayout } from '@/layouts/SiteLayout';
import { AboutPage } from '@/pages/AboutPage';
import { GccPage } from '@/pages/GccPage';
import { HomePage } from '@/pages/HomePage';
import { MethodPage } from '@/pages/MethodPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { StandardPage } from '@/pages/StandardPage';
import { StartPage } from '@/pages/StartPage';

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
      ...aliasRoutes,
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
