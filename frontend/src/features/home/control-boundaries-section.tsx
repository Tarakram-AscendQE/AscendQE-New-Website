import React from 'react';

export const ControlBoundariesSection: React.FC = () => {
  return (
    <section className="section-pad">
      <div className="wrap control-grid">
        <div className="control-copy reveal">
          <div className="mono eyebrow">04 / YOUR TEAM IS STILL IN COMMAND</div>
          <h2>
            Fast agents.<br />
            <span>Clear boundaries.</span>
          </h2>
          <p>
            AscendQE connects the engineering work. Your team sets the scope, defines the
            controls and owns the release decision.
          </p>
        </div>
        <div className="control-list reveal">
          <div className="control-item">
            <span>01</span>
            <div>
              <h3>Your environment. Your way of working.</h3>
              <p>Shape the platform around your applications, workflows and deployment needs.</p>
            </div>
          </div>
          <div className="control-item">
            <span>02</span>
            <div>
              <h3>Human judgment where it matters.</h3>
              <p>Bring permissions, policies and review gates into the QE workflow.</p>
            </div>
          </div>
          <div className="control-item">
            <span>03</span>
            <div>
              <h3>Evidence you can follow.</h3>
              <p>
                Connect requirements, tests, results and changes to inform release readiness.
              </p>
            </div>
          </div>
          <div className="control-item">
            <span>04</span>
            <div>
              <h3>A small team can think bigger.</h3>
              <p>Run the platform with your team, or discuss managed services scoped to your needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

