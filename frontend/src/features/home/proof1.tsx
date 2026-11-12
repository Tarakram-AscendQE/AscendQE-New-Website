import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '@/shared/pagination';

export const ProofFaqSection1: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const FAQsPerPage = 5;

  const faqs = [
    {
      q: "What does AscendQE do?",
      a: "AscendQE is an AI Product Development company focused on Quality Engineering. \nWe build intelligent platforms and AI-powered solutions that transform software testing, test automation, and AI validation.\n"
    },
    {
      q: "What makes AscendQE different from traditional software testing companies?",
      a: "We don't just test software; we build AI products that transform how quality is engineered. \nOur focus is on intelligent automation, agentic AI, continuous validation, and scalable Quality Engineering solutions.\n"
    },
    {
      q: "What is Quality Engineering in the AI era?",
      a: "Quality Engineering goes beyond traditional testing. \nIt combines AI, automation, intelligent analytics, and continuous validation to deliver reliable software and trustworthy AI systems.\n"
    },
    {
      q: "How does AI transform traditional software testing?",
      a: "AI accelerates test creation, improves test coverage, prioritizes risks, analyzes failures, and reduces repetitive testing efforts — \nhelping teams deliver quality software faster and with greater confidence.\n"
    },
    {
      q: "What is Agentic AI in Quality Engineering?",
      a: "Agentic AI uses specialized AI agents that can understand application workflows, plan testing activities, generate and execute tests, \nanalyze results, and adapt to changes with appropriate human oversight.\n"
    },
    {
      q: "Can AscendQE help organizations test AI-powered applications?",
      a: "Absolutely! Through our AI testing and validation capabilities, \nwe help organizations evaluate AI applications for accuracy, reliability, performance, safety, and responsible AI behavior.\n"
    },
    {
      q: "Can AscendQE solutions integrate with existing enterprise tools?",
      a: "Yes. Our solutions are designed to work with existing enterprise ecosystems, including test management, development, automation, and CI/CD tools, \nhelping organizations maximize their existing investments.\n"
    },
    {
      q: "Does AI-powered testing replace human testers?",
      a: "No. Our vision is to empower quality professionals with intelligent AI agents. \nAI reduces repetitive effort and accelerates testing, while human expertise remains essential for strategic decisions, validation, and quality governance.\n"
    },
    {
      q: "Who can benefit from AscendQE's solutions?",
      a: "Enterprises, software product companies, engineering teams, QA organizations, technology leaders, and businesses developing \nor adopting AI-powered applications can benefit from our solutions.\n"
    },
    {
      q: "Can AscendQE support enterprise-scale Quality Engineering?",
      a: "Yes. We focus on building scalable, enterprise-oriented AI products that support multiple projects, \nteams, workflows, integrations, and quality engineering needs.\n"
    },
    {
      q: "How can organizations get started with AscendQE?",
      a: "Start with a conversation. Share your Quality Engineering challenges and business goals, \nand our team will help identify the right AI-powered solution for your organization.\n"
    },
    {
      q: "What is AscendQE's vision for the future of Quality Engineering?",
      a: "To move the industry beyond traditional testing towards Autonomous Quality Engineering —\nwhere intelligent AI systems continuously discover, validate, optimize, and improve software quality.\n"
    }
  ];

  const totalPages = Math.ceil(faqs.length / FAQsPerPage);
  const visibleFaqs = faqs.slice((currentPage - 1) * FAQsPerPage, currentPage * FAQsPerPage);

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

        {/* Collapsible FAQ Details with Pagination */}
        <div className="faq">
          <h3>A few good questions.</h3>
          <div>
            {visibleFaqs.map((faq, index) => (
              <details key={index}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="proof-faq-pagination mt-10 flex w-full justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalResults={faqs.length}
                resultsPerPage={FAQsPerPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
