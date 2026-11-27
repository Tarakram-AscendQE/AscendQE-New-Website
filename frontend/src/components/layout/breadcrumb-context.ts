import { createContext, useContext, useEffect } from 'react';

/** Setter for the current page's breadcrumb label (provided by SiteLayout). */
export const BreadcrumbLabelContext = createContext<(label: string | null) => void>(() => undefined);

/** Names the current page in the breadcrumbs (e.g. an article's title); cleared when the page unmounts. */
export function useBreadcrumbLabel(label: string | null): void {
  const setLabel = useContext(BreadcrumbLabelContext);
  useEffect(() => {
    setLabel(label);
    return () => setLabel(null);
  }, [label, setLabel]);
}
