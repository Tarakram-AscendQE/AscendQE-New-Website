import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Workflow, Smartphone, Database, Route } from 'lucide-react';
import { Reveal } from '@/shared';
import { WorkflowVideoDialog } from '@/features/workflow/WorkflowVideoDialog';
import agentsWorkVideo from '@/assets/videos/Agentic QE - AsendQE-how our agents works1.mp4';

const steps = [
  [
    '01 / AUTOMATE',
    'From test intent<br>to executable automation.',
    'Start with agreed business behaviour, assertions and test data. Generate automation in the agreed application and framework context.',
    'Illustrative input: a customer completes checkout and receives an order confirmation.',
  ],
  [
    '02 / EXECUTE',
    'Run the test.<br>Keep the evidence.',
    'Execute against the agreed environment. Inspect the results and distinguish application defects, environment issues and automation failures.',
    'Review: execution result · assertions · diagnostics · evidence',
  ],
  [
    '03 / FIND THE GAPS',
    'A green test.<br>An uncovered journey?',
    'Review coverage and traceability to identify requirements or paths that still lack suitable test evidence.',
    'Illustrative gap: successful payment covered; declined-payment recovery not yet covered.',
  ],
  [
    '04 / CONNECT THE IMPACT',
    'One change.<br>Which modules feel it?',
    'Use available relationships across requirements, application modules and test assets to assess likely impact.',
    'Illustrative connection: payment-provider change → checkout flow → payment tests → order confirmation',
  ],
  [
    '05 / PRIORITIZE',
    'Know what<br>to test next.',
    'Combine impact, gaps and risk context to suggest the next tests and modules to investigate. Keep human review in the decision.',
    'Illustrative next test: verify declined-payment recovery before the next release.',
  ],
];

export const ProofPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const agentsVideoRef = useRef<HTMLVideoElement>(null);
  const current = steps[activeStep];

  useEffect(() => {
    if (agentsVideoRef.current) {
      agentsVideoRef.current.muted = true;
      agentsVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main>
      <section className="page-intro">
        <div className="eyebrow">HOW IT WORKS</div>
        <h1>
          A connected workflow.<br />
          <span>A clearer next move.</span>
        </h1>
        <p className="text-[#64748b]">Automate. Execute. Find the gaps. Know what to test next.</p>
      </section>

      <section className="section proof-workbench !pt-4 !pb-8 sm:!pb-10">
        <div className="workbench-head">
          <span>EXPLORE THE QUALITY WORKFLOW</span>
          <small>Illustrative workflow · not a live product run</small>
        </div>
        <div className="proof-tabs" role="group" aria-label="Workflow stages">
          {['01 / Automate', '02 / Execute', '03 / Find the gaps', '04 / Connect the impact', '05 / Know what’s next'].map((label, idx) => (
            <button
              key={idx}
              data-step={idx}
              className={activeStep === idx ? 'active' : ''}
              aria-pressed={activeStep === idx ? 'true' : 'false'}
              onClick={() => setActiveStep(idx)}
            >
              {label}
            </button>
          ))}
        </div>
        <div id="proof-content" aria-live="polite">
          <span className="eyebrow">{current[0]}</span>
          <h2 dangerouslySetInnerHTML={{ __html: current[1] }} />
          <p className="text-[#64748b]">{current[2]}</p>
          <div className="example">{current[3]}</div>

          {/* Action Row: Watch the workflow */}
          <div className="mt-8 pt-5 border-t border-[#dae2ee]/80 flex items-center justify-between flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="button inline-flex items-center gap-2.5 cursor-pointer !py-3 !px-6 !text-sm !font-semibold !rounded-lg hover:bg-[#004bdc] transition-all shadow-sm hover:shadow"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch the workflow
            </button>
            <span className="aqe-caption text-[#64748b]">
              Agentic QE · Humans in the lead
            </span>
          </div>
        </div>
      </section>

      <section className="section !py-10 sm:!py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Context That Connects Info */}
          <div>
            <div className="eyebrow">CONTEXT THAT CONNECTS</div>
            <h2>
              Follow the change.<br />
              <span className="muted text-[#64748b]">Find the tests that matter.</span>
            </h2>
            <div className="trace-chain">
              <span>Requirement</span>
              <span>Module</span>
              <span>Test case</span>
              <span>Execution</span>
              <span>Evidence</span>
            </div>
            <p className="lead text-[#64748b]">
              Trace relationships across requirements, tests, results and defects. Use change impact and coverage gaps to focus the next round of testing.
            </p>
            <p className="fine text-[#64748b]">
              Illustrative relationship model. Available context, integrations and configured workflows determine the analysis.
            </p>
          </div>

          {/* Right Column: Autoplay Muted Video */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-[#dce4f1] bg-[#061332] shadow-[0_16px_40px_rgba(7,19,39,0.08)]">
            <video
              ref={agentsVideoRef}
              src={agentsWorkVideo}
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-auto aspect-video object-cover rounded-2xl block"
            />
          </div>
        </div>
      </section>

      <section className="section coverage !block !py-10 sm:!py-12">
        <Reveal delay={0.1}>
          <div className="eyebrow !text-[#0b1831] !block !mb-4">ACROSS THE JOURNEY</div>
          <h2 className="!block !mt-0 !mb-7 text-[clamp(36px,4.3vw,62px)] font-[650] leading-[1.09] tracking-[-2px] text-[#071327]">
            One journey.<br />
            <span className="text-[#64748b] font-[650]">More than one screen.</span>
          </h2>
        </Reveal>
        <div className="coverage-grid !grid !grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-5 !gap-4 sm:!gap-[18px] !my-8">
          {[
            { title: "Web", sub: "UI workflows", icon: Monitor },
            { title: "API", sub: "Connected services", icon: Workflow },
            { title: "Mobile", sub: "Application journeys", icon: Smartphone },
            { title: "Data", sub: "Database validation", icon: Database },
            { title: "End to end", sub: "Business outcomes", icon: Route },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={0.1 + idx * 0.08} className="h-full">
                <div className="!border !border-[#dce4f1] !rounded-2xl !p-4 sm:!p-5 bg-white transition-all duration-200 hover:-translate-y-1 hover:!border-[#1763ff] hover:shadow-[0_10px_28px_rgba(23,99,255,0.08)] h-full flex items-center gap-3.5 sm:gap-4 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#eff5ff] border border-[#dce8ff] flex items-center justify-center text-[#1763ff] shrink-0 transition-transform group-hover:scale-105">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                  </div>
                  <div className="min-w-0">
                    <b className="!block !text-[19px] sm:!text-[21px] !font-bold !tracking-tight !text-[#071327] group-hover:!text-[#1763ff] transition-colors leading-tight">
                      {item.title}
                    </b>
                    <span className="!block !mt-1 !text-[13px] sm:!text-[13.5px] !leading-snug !text-[#64748b]">
                      {item.sub}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="fine !block !mt-6 text-[#64748b]">
          Supported applications, frameworks, devices and environments are confirmed during scoping.
        </p>
      </section>

      <section className="closing !py-14 sm:!py-16">
        <div className="eyebrow">START WITH PROOF</div>
        <h2>
          Your first 100 test cases.<br />
          <span>Automated free.</span>
        </h2>
        <p>See the scripts. Run the tests. Measure the difference.</p>
        <Link className="button" to="/start">
          Automate my first 100 test cases
        </Link>
        <p className="fine">
          100 qualifying test cases. Agreed scope, access and acceptance criteria apply.
        </p>
      </section>

      <WorkflowVideoDialog
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </main>
  );
};
