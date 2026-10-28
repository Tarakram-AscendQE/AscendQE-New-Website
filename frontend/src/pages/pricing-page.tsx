import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/shared';

export const PricingPage: React.FC = () => {
  return (
    <main>
      <section className="page-intro">
        <Reveal delay={0.05}>
          <div className="eyebrow">YOUR OPTIONS</div>
          <h1>
            Your team runs it.<br />
            <span>Or we do.</span>
          </h1>
          <p>One clear choice: how much of the operation would you like us to handle?</p>
        </Reveal>
      </section>

      <div className="price-grid">
        <Reveal delay={0.15} className="h-full">
          <article className="price-card enterprise flex flex-col h-full">
            <div className="price-top">PRIVATE ENTERPRISE PLATFORM</div>
            <h3>
              Your platform.<br />
              Your environment.
            </h3>
            <p className="price-unit">From</p>
            <div className="price min-h-[72px] flex items-baseline">
              {' '}$25K<span> / month</span>
            </div>
            <p className="price-unit">Monthly billing · annual commitment</p>
            <ul className="flex-1">
              <li>Configured for your applications and workflows</li>
              <li>Agreed private deployment and capacity</li>
              <li>Connected automation, execution and quality insights</li>
              <li>Support and updates within contracted scope</li>
            </ul>
            <div className="mt-auto">
              <Link className="button" to="/start?offer=platform">
                Prove it on my application
              </Link>
              <p className="fine min-h-[40px] mt-4 mb-0 leading-[1.6]">
                Operating costs, bespoke work and managed services additional.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.25} className="h-full">
          <article className="price-card flex flex-col h-full" id="managed">
            <div className="price-top">MANAGED SERVICES</div>
            <h3>
              Small QA team?<br />
              We can run it for you.
            </h3>
            <p className="price-unit invisible select-none" aria-hidden="true">&nbsp;</p>
            <div className="managed-price min-h-[72px] flex items-center">Let’s scope it.</div>
            <p className="price-unit">We love startups like us.</p>
            <ul className="flex-1">
              <li>Agree the applications and test portfolio</li>
              <li>Scope creation, execution and ongoing maintenance</li>
              <li>Define reporting and response commitments</li>
              <li>Choose the responsibilities you want us to own</li>
            </ul>
            <div className="mt-auto">
              <Link className="button dark" to="/start?offer=managed">
                Discuss my managed service
              </Link>
              <p className="fine min-h-[40px] mt-4 mb-0 leading-[1.6]">
                Custom quote. Platform access and operating costs are itemized in the proposal.
              </p>
            </div>
          </article>
        </Reveal>
      </div>

      <section className="section !block">
        <h2 className="!block !mt-0 !mb-6 text-[clamp(36px,4.3vw,64px)] font-[650] leading-[1.09] tracking-[-2.7px] text-[#071327]">
          Start with proof.<br />
          <span className="text-[#64748b]">Scale with confidence.</span>
        </h2>
        <p className="lead !text-[#64748b] !text-[18px] md:!text-[20px] !leading-[1.7] !max-w-[720px] !mb-10">
          Your first 100 qualifying test cases, automated free. Inspect the result before deciding on a larger commitment.
        </p>
        <div className="faq !block !max-w-[900px] !mt-10">
          <details className="!block !border-t !border-[#e0e5ef] !py-[18px]">
            <summary className="!cursor-pointer !font-semibold !text-[18px] !text-[#0b1831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              Can we discuss monthly payments?
            </summary>
            <p className="!text-[16px] !leading-[1.7] !text-[#64748b] !mt-3.5 !max-w-[800px]">
              The starting offer is $25,000/month with a 12-month commitment, totaling $300,000/year. Operating costs are additional. Monthly billing does not mean cancel-anytime; payment and termination terms belong in the agreement.
            </p>
          </details>
          <details className="!block !border-t !border-[#e0e5ef] !py-[18px]">
            <summary className="!cursor-pointer !font-semibold !text-[18px] !text-[#0b1831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              What does “configured for you” include?
            </summary>
            <p className="!text-[16px] !leading-[1.7] !text-[#64748b] !mt-3.5 !max-w-[800px]">
              Agreed application onboarding, deployment and workflow configuration. Bespoke development, additional integrations and expanded capacity are separately scoped.
            </p>
          </details>
          <details className="!block !border-t !border-[#e0e5ef] !py-[18px]">
            <summary className="!cursor-pointer !font-semibold !text-[18px] !text-[#0b1831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
              What does managed service pricing include?
            </summary>
            <p className="!text-[16px] !leading-[1.7] !text-[#64748b] !mt-3.5 !max-w-[800px]">
              The proposal specifies platform access, delivery responsibilities, infrastructure, execution frequency, maintenance allowances and service levels. There is no assumed $25K minimum for every managed-service engagement.
            </p>
          </details>
        </div>
        <Link className="text-link !inline-block !mt-8 !text-[14px] !font-bold text-[#0b1831] hover:text-[#1763ff] border-b border-[#0b1831] pb-1 transition-colors" to="/docs#commercial">
          Read assumptions and payment considerations
        </Link>
      </section>

      <section className="closing">
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
    </main>
  );
};
