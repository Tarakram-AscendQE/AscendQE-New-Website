import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** On navigation: jump to the `#section` in the URL if there is one, otherwise to the top of the page. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      // scroll-padding-top on <html> (site.css) keeps the section clear of the sticky header.
      target.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};
