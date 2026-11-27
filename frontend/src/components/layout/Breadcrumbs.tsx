import { Link, useLocation } from 'react-router-dom';
import { breadcrumbTrail } from '@/routes/breadcrumbs';

const SITE_ORIGIN = 'https://ascendqe.com';

/** Breadcrumb trail above each page's hero (none on the home page), plus schema.org BreadcrumbList data. */
export function Breadcrumbs({ pageLabel }: { pageLabel: string | null }) {
  const { pathname } = useLocation();
  const trail = breadcrumbTrail(pathname, pageLabel);
  if (trail.length === 0) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${SITE_ORIGIN}${crumb.to ?? pathname}`,
    })),
  };

  return (
    <nav className="crumbbar" aria-label="Breadcrumb">
      <div className="wrap">
        <ol>
          {trail.map((crumb) => (
            <li key={crumb.to ?? crumb.label}>
              {crumb.to ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span aria-current="page" title={crumb.label}>
                  {crumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </nav>
  );
}
