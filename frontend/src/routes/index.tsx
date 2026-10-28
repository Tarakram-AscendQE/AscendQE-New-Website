import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '../layouts/root-layout';
import { HomePage } from '../pages/home-page';
import { ProofPage } from '../pages/proof-page';
import { PayoffPage } from '../pages/payoff-page';
import { PricingPage } from '../pages/pricing-page';
import { StartPage } from '../pages/start-page';
import { DocsPage } from '../pages/docs-page';
import { ReferencePage } from '../pages/reference-page';
import { CarrersPage } from '../pages/careers/careers-page';
import { AboutUsPage } from '../pages/about/about-page';
import { TestimonialsPage } from '../features/testimonials/TestimonialsPage';
import { PrivacyPolicyPage } from '../features/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from '../features/legal/TermsOfServicePage';
import { NotFoundPage } from '../pages/not-found-page';

// Blog & Studio Pages
import { BlogAuthGate } from '../pages/BlogAuthGate';
import { BlogArticle } from '../pages/BlogArticle';
import { BlogsPage } from '../pages/blogs-page';

// Product Pages
import { PlatformPage as MyDiyaPage } from '../features/products/myDiya-product/PlatformPage';
import { MySTLCPage } from '../features/products/mySTLC-product/page';
import { MySDETPage } from '../features/products/mySDET-product/page';
import { MyTEVVPage } from '../features/products/myTEVV-product/page';
import { MyP95Page } from '../features/products/myP95-product/page';
import { MyUTPage } from '../features/products/myUT-product/page';
import { MyTDMPage } from '../features/products/myTDM-product/page';

const ExternalRedirect: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="h-8 w-8 border-2 border-[#1763ff] border-t-transparent rounded-full animate-spin mb-4" />
      <h2 className="text-xl font-bold text-[#0b1831] mb-2">Redirecting to AscendQE...</h2>
      <p className="text-slate-500 text-sm mb-4">
        If you are not redirected automatically,{' '}
        <a href={url} className="text-[#1763ff] font-semibold underline">
          click here to open {url}
        </a>.
      </p>
    </main>
  );
};

export const router = createBrowserRouter([
  // Hidden studio & writing studio routes (Direct route only, not displayed in header or footer)
  { path: '/blogs/login', element: <BlogAuthGate /> },
  { path: '/blog/login', element: <BlogAuthGate /> },
  { path: '/studio', element: <BlogAuthGate /> },
  { path: '/blog-login', element: <BlogAuthGate /> },
  { path: '/admin/blogs', element: <BlogAuthGate /> },

  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'proof', element: <ProofPage /> },
      { path: 'how-it-works', element: <Navigate to="/proof" replace /> },
      { path: 'payoff', element: <PayoffPage /> },
      { path: 'calculator', element: <Navigate to="/payoff" replace /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'start', element: <StartPage /> },
      { path: 'docs', element: <DocsPage /> },
      { path: 'reference', element: <ReferencePage /> },

      // Public Blog routes
      { path: 'blogs', element: <BlogsPage /> },
      { path: 'blog', element: <Navigate to="/blogs" replace /> },
      { path: 'blog/:slug', element: <BlogArticle /> },
      { path: 'blogs/:slug', element: <BlogArticle /> },
      { path: 'article/:slug', element: <BlogArticle /> },

      // Navigation and footer aliases
      { path: 'contact', element: <Navigate to="/start" replace /> },
      { path: 'about', element: <AboutUsPage /> },
      { path: 'about-us', element: <Navigate to="/about" replace /> },
      { path: 'careers', element: <CarrersPage /> },
      { path: 'career', element: <Navigate to="/careers" replace /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'testimonial', element: <Navigate to="/testimonials" replace /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'privacy-policy', element: <Navigate to="/privacy" replace /> },
      { path: 'terms', element: <TermsOfServicePage /> },
      { path: 'terms-of-service', element: <Navigate to="/terms" replace /> },
      { path: 'terms-and-conditions', element: <Navigate to="/terms" replace /> },

      // Product pages
      { path: 'mydiya', element: <MyDiyaPage /> },
      { path: 'platform', element: <Navigate to="/mydiya" replace /> },
      { path: 'mystlc', element: <MySTLCPage /> },
      { path: 'mysdet', element: <MySDETPage /> },
      { path: 'mytevv', element: <MyTEVVPage /> },
      { path: 'myp95', element: <MyP95Page /> },
      { path: 'myut', element: <MyUTPage /> },
      { path: 'mytdm', element: <MyTDMPage /> },

      // Sub-path aliases (/products/:slug)
      { path: 'products/mydiya', element: <MyDiyaPage /> },
      { path: 'products/mystlc', element: <MySTLCPage /> },
      { path: 'products/mysdet', element: <MySDETPage /> },
      { path: 'products/mytevv', element: <MyTEVVPage /> },
      { path: 'products/myp95', element: <MyP95Page /> },
      { path: 'products/myut', element: <MyUTPage /> },
      { path: 'products/mytdm', element: <MyTDMPage /> },

      // Backwards-compatibility aliases for legacy .html paths
      { path: 'index.html', element: <Navigate to="/" replace /> },
      { path: 'proof.html', element: <Navigate to="/proof" replace /> },
      { path: 'payoff.html', element: <Navigate to="/payoff" replace /> },
      { path: 'pricing.html', element: <Navigate to="/pricing" replace /> },
      { path: 'start.html', element: <Navigate to="/start" replace /> },
      { path: 'docs.html', element: <Navigate to="/docs" replace /> },
      { path: 'reference.html', element: <Navigate to="/reference" replace /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

