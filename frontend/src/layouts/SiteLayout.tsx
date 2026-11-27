import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BreadcrumbLabelContext } from '@/components/layout/breadcrumb-context';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CookieConsent } from '@/components/layout/CookieConsent';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export function SiteLayout() {
  // Label for pages named by their content (an article title), set through useBreadcrumbLabel.
  const [pageLabel, setPageLabel] = useState<string | null>(null);

  return (
    <BreadcrumbLabelContext.Provider value={setPageLabel}>
      <ScrollToTop />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Breadcrumbs pageLabel={pageLabel} />
        <Outlet />
      </main>
      <SiteFooter />
      <CookieConsent />
    </BreadcrumbLabelContext.Provider>
  );
}
