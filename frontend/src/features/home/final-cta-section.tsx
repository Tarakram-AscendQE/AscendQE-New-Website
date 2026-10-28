import React from 'react';
import { Link } from 'react-router-dom';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="final-cta">
      <div className="wrap">
        <div className="mono">YOU COMMAND THE OUTCOME.</div>
        <h2>
          Your next peak.<br />
          Our QE crew.
        </h2>
        <p>See how your first 100 test cases can be automated. Start with a demo.</p>
        <Link className="btn" to="/start">
          Show me my first 100 tests <span className="arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
};

