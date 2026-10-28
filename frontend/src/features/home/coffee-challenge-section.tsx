import React from 'react';
import { Link } from 'react-router-dom';

export const CoffeeChallengeSection: React.FC = () => {
  return (
    <section id="challenge" className="coffee section-pad">
      <div className="wrap coffee-grid">
        <div className="reveal">
          <div className="mono eyebrow">05 / MAKE US PROVE IT</div>
          <h2>
            Your scenario.<br />
            Your coffee break.<br />
            <span>Our demo.</span>
          </h2>
          <p className="copy">
            Bring a real QE scenario. Let’s walk it from intent to evidence, and measure the
            time, cost and work it takes.
          </p>
          <Link className="text-link" to="/start?offer=challenge">
            Put your scenario to the test <span aria-hidden="true">↗</span>
          </Link>
          <p className="coffee-small aqe-caption">
            Agree the scope. Compare the complete workflow. See the economics for your application.
          </p>

          <div className="challenge-detail">
            <h3>Better. Faster. Cheaper. Or free.</h3>
            <p>
              Bring the solution you want to compare. We’ll agree the QE scenario, output
              quality, elapsed time and complete cost basis before the evaluation.
            </p>
            <p style={{ marginTop: '12px' }}>
              If you find a better solution, our platform is free under the agreed challenge
              terms. Confirm eligibility, the comparison criteria, licence duration and any
              operating or service costs with AscendQE before starting.
            </p>
          </div>
        </div>

        {/* Animated Coffee Cup Art */}
        <div className="coffee-art" aria-hidden="true">
          <div className="steam" />
          <div className="steam s2" />
          <div className="steam s3" />
          <div className="cup" />
          <div className="saucer" />
          <div className="coffee-stamp">LESS SPECULATION. MORE DEMONSTRATION.</div>
        </div>
      </div>
    </section>
  );
};

