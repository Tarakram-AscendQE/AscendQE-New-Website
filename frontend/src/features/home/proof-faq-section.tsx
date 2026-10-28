import React from 'react';
import { Link } from 'react-router-dom';

export const ProofFaqSection: React.FC = () => {
  return (
    <section id="proof" className="proof section-pad">
      <div className="wrap">
        <div className="proof-grid">
          <div className="proof-art reveal">
            <span className="mono">YOUR APPLICATIONS / YOUR TESTS</span>
            <div className="hundred">100</div>
            <span className="small-chip">Qualifying test cases. Automated free.</span>
          </div>
          <div className="proof-copy reveal">
            <div className="mono eyebrow">06 / START WITH PROOF</div>
            <h2>
              See your first 100<br />
              test cases automated.
            </h2>
            <p>
              Book a demo, bring your test cases, and agree a scoped proof. Your first 100
              qualifying test cases, automated free. See the scripts. Run the tests. Measure the
              difference.
            </p>
            <Link className="btn" to="/start">
              Book my 100-test demo <span className="arrow" aria-hidden="true">↗</span>
            </Link>
            <p className="terms">
              100 qualifying test cases. Scope, eligibility and acceptance criteria agreed with
              the AscendQE team.
            </p>
          </div>
        </div>

        {/* Collapsible FAQ Details */}
        <div className="faq">
          <h3>A few good questions.</h3>
          <div>
            <details>
              <summary>Is AscendQE an automation tool or a QE platform?</summary>
              <p>
                AscendQE brings discovery, test design, automation, execution, change analysis and
                evidence together. Automation is one part of the wider quality engineering workflow.
              </p>
            </details>
            <details>
              <summary>Does our team stay in control?</summary>
              <p>
                Yes. The operating model includes scoped work, role-based access, policies and human
                review. Discuss the controls and deployment configuration your team needs during the
                demo.
              </p>
            </details>
            <details>
              <summary>Can you help us test AI applications?</summary>
              <p>
                AscendQE’s AI testing and evaluation offering covers AI behaviour and trust
                dimensions. Use the demo to scope your model, agent, workflow and application-level
                evaluation needs.
              </p>
            </details>
            <details>
              <summary>What should we bring to the demo?</summary>
              <p>
                Bring one scenario, the application context, and the bottleneck you want to remove.
                We can agree what success looks like and show the relevant QE workflow.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

