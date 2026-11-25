import { Link } from 'react-router-dom';
import { HeadMeta } from '@/components/seo/HeadMeta';

export function NotFoundPage() {
  return (
    <>
      <HeadMeta title="Page not found · AscendQE" robots="noindex, follow" />
      <section className="hero">
        <div className="wrap">
          <div style={{ maxWidth: '900px' }}>
            <p className="eyebrow">Page not found</p>
            <h1>This page isn’t here.</h1>
            <p className="lede">
              The link may be old, or the page may have moved. Everything we do starts from the home page.
            </p>
            <div className="actions">
              <Link className="btn" to="/">
                Go to the home page
              </Link>
              <Link className="tlink" to="/start">
                Start a Proof Sprint →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
