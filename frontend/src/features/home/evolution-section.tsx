import React from 'react';

export const EvolutionSection: React.FC = () => {
  return (
    <section id="system" className="shift dark section-pad">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <div className="mono eyebrow">01 / THE SHIFT</div>
            <h2>Tools do tasks.<br />AscendQE runs QE.</h2>
          </div>
          <p>
            Connect the work between your tools: what to test, how to test it, what changed, and
            what the evidence means.
          </p>
        </div>

        <div className="evolution reveal">
          <article>
            <span className="number">01 / EXECUTION</span>
            <h3>Run the test.</h3>
            <p>
              Execute scripts.<br />Capture the result.
            </p>
          </article>
          <article>
            <span className="number">02 / AUTOMATION</span>
            <h3>Scale the work.</h3>
            <p>
              Build tests.<br />Maintain the suite.
            </p>
          </article>
          <article>
            <span className="number">03 / AI ASSISTANCE</span>
            <h3>Accelerate a task.</h3>
            <p>
              Generate. Heal.<br />Analyze.
            </p>
          </article>
          <article>
            <span className="number">04 / ASCENDQE</span>
            <h3>Connect the system.</h3>
            <p>
              Understand. Create. Execute.<br />Adapt. Decide.
            </p>
          </article>
        </div>

        <div className="evolution-foot">
          <strong>Your tools stay useful. The work between them gets connected.</strong>
          <span>From individual activities to a continuous QE loop.</span>
        </div>
      </div>
    </section>
  );
};

