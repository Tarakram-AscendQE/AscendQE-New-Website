import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main>
      <section className="page-intro">
        <div className="eyebrow">404</div>
        <h1>
          Page not found.<br />
          <span>Check the URL.</span>
        </h1>
        <p>The page you are looking for does not exist.</p>
        <div style={{ marginTop: '30px' }}>
          <Link className="button" to="/">
            Back to the platform
          </Link>
        </div>
      </section>
    </main>
  );
};
