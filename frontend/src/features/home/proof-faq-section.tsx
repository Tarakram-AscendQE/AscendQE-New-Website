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
            <Link className="btn" to="/contact">
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
              <summary>What does AscendQE do?</summary>
              <p>
                AscendQE is an AI Product Development company focused on Quality Engineering. 
                We build intelligent platforms and AI-powered solutions that transform software testing, test automation, and AI validation.
              </p>
            </details>
            <details>
              <summary>What makes AscendQE different from traditional software testing companies?</summary>
              <p>
                We don't just test software; we build AI products that transform how quality is engineered. 
                Our focus is on intelligent automation, agentic AI, continuous validation, and scalable Quality Engineering solutions.
              </p>
            </details>
            <details>
              <summary>What is Quality Engineering in the AI era?</summary>
              <p>
                Quality Engineering goes beyond traditional testing. 
                It combines AI, automation, intelligent analytics, and continuous validation to deliver reliable software and trustworthy AI systems.
              </p>
            </details>
            <details>
              <summary>How does AI transform traditional software testing?</summary>
              <p>
                AI accelerates test creation, improves test coverage, prioritizes risks, analyzes failures, and reduces repetitive testing efforts — 
                helping teams deliver quality software faster and with greater confidence.
              </p>
            </details>
            <details>
              <summary>What is Agentic AI in Quality Engineering?</summary>
              <p>
                Agentic AI uses specialized AI agents that can understand application workflows, plan testing activities, generate and execute tests, 
                analyze results, and adapt to changes with appropriate human oversight.
              </p>
            </details>
            <details>
              <summary>Can AscendQE help organizations test AI-powered applications?</summary>
              <p>
               Absolutely! Through our AI testing and validation capabilities, 
               we help organizations evaluate AI applications for accuracy, reliability, performance, safety, and responsible AI behavior.
              </p>
            </details>
            <details>
              <summary>Can AscendQE solutions integrate with existing enterprise tools?</summary>
              <p>
                Yes. Our solutions are designed to work with existing enterprise ecosystems, including test management, development, automation, and CI/CD tools, 
                helping organizations maximize their existing investments.
              </p>
            </details>
            <details>
              <summary>Does AI-powered testing replace human testers?</summary>
              <p>
                No. Our vision is to empower quality professionals with intelligent AI agents. 
                AI reduces repetitive effort and accelerates testing, while human expertise remains essential for strategic decisions, validation, and quality governance.
              </p>
            </details>
            <details>
              <summary>Who can benefit from AscendQE's solutions?</summary>
              <p>
                Enterprises, software product companies, engineering teams, QA organizations, technology leaders, and businesses developing 
                or adopting AI-powered applications can benefit from our solutions.
              </p>
            </details>
            <details>
              <summary>Can AscendQE support enterprise-scale Quality Engineering?</summary>
              <p>
                Yes. We focus on building scalable, enterprise-oriented AI products that support multiple projects, 
                teams, workflows, integrations, and quality engineering needs.
              </p>
            </details>
            <details>
              <summary>How can organizations get started with AscendQE?</summary>
              <p>
                Start with a conversation. Share your Quality Engineering challenges and business goals, 
                and our team will help identify the right AI-powered solution for your organization.
              </p>
            </details>
            <details>
              <summary>What is AscendQE's vision for the future of Quality Engineering?</summary>
              <p>
                To move the industry beyond traditional testing towards Autonomous Quality Engineering —
                 where intelligent AI systems continuously discover, validate, optimize, and improve software quality.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};
