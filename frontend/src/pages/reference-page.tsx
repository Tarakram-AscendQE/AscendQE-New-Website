import React, { useState, useRef } from 'react';

const dlHref = "";

const entriesData = [
  {
    "id": "entry-0",
    "category": "Company",
    "summary": "<small>Company</small>Company, history and philosophy",
    "content": "The site positions AscendQE as a quality-engineering technology company for software and AI systems. Its narrative connects testing education beginning in Hyderabad in 2001 with today\u2019s agent-based product suite. It reports more than 70,000 professionals mentored and testing reference books published through Wiley India and Dreamtech. These are company-published claims. Human responsibility, evidence-backed decisions and customer control are recurring principles. The site material reviewed does not establish a specific Selenium core-team role for the founder.",
    "linkHref": "https://ascendqe.com/about",
    "linkText": "Original source page"
  },
  {
    "id": "entry-1",
    "category": "Products",
    "summary": "<small>Products</small>Product architecture and commercial boundaries",
    "content": "The portfolio separates a configurable QE agent environment from six specialist products: mySTLC, mySDET, myTEVV, myP95, myUT and myTDM. Products may work independently or together. Shared context, orchestration, change awareness and governance connect the portfolio. This breadth is a product catalogue, not confirmation that all modules are included in the new $25K/month starting offer. Included products and capacity must be listed in the proposal.",
    "linkHref": "https://ascendqe.com/platform",
    "linkText": "Original source page"
  },
  {
    "id": "entry-2",
    "category": "Products",
    "summary": "<small>Products</small>myDiya \u2014 configurable QE workflows",
    "content": "myDiya combines reusable agents, enterprise knowledge, orchestration and human review. Customers can compose workflows around documents, application discovery, APIs, databases, repositories, test generation and evaluations. Shared project context reduces repeated discovery. The described runtime controls include confidence thresholds, permission policies, approvals, spending limits, retries, timeouts and audit requirements. The site calls the runtime control layer myHelm. Reusable agents and workflow patterns can be applied across projects under governance.",
    "linkHref": "https://ascendqe.com/mydiya",
    "linkText": "Original source page"
  },
  {
    "id": "entry-3",
    "category": "Products",
    "summary": "<small>Products</small>myDiya \u2014 agent capability catalogue",
    "content": "The described specialists cover conversation, knowledge retrieval, document analysis, browser discovery, APIs, databases, code, test design, test data, execution, evaluation, reporting, routing, orchestration, human approvals, enterprise connectors, notifications and quality gates. Some agents obtain context; others act on approved tools or evaluate evidence. Workflow state, checkpoints, lineage and approvals are part of the shared operating context. These are capability descriptions, not an unrestricted permission to perform actions.",
    "linkHref": "https://ascendqe.com/mydiya",
    "linkText": "Original source page"
  },
  {
    "id": "entry-4",
    "category": "Products",
    "summary": "<small>Products</small>mySDET \u2014 automation lifecycle",
    "content": "The automation product covers discovery, scenario identification, test-data support, script generation, execution, diagnostics, controlled repair and change impact. Published application categories include web UI, APIs, mobile, combined web/API workflows and end-to-end journeys. Service FAQs also describe database validation. Existing repositories and framework conventions can be reused. Specific iOS/Android versions, device support and every framework are not enumerated in the reviewed material.",
    "linkHref": "https://ascendqe.com/mysdet",
    "linkText": "Original source page"
  },
  {
    "id": "entry-5",
    "category": "Products",
    "summary": "<small>Products</small>mySTLC \u2014 lifecycle and traceability",
    "content": "mySTLC addresses requirements, test design, test data, manual testing, defects, change impact and release readiness. It relates requirements to scenarios, execution evidence, changes and defects. Risk, coverage and result information support release assessments. It complements automation rather than being interchangeable with mySDET. The original site includes directional industry benchmarks; those should not be treated as measured AscendQE customer outcomes without their underlying evidence.",
    "linkHref": "https://ascendqe.com/mystlc",
    "linkText": "Original source page"
  },
  {
    "id": "entry-6",
    "category": "Products",
    "summary": "<small>Products</small>myTEVV \u2014 AI evaluation and assurance",
    "content": "myTEVV evaluates AI models, agents and applications across correctness, grounding, security, privacy, fairness, robustness and explainability. Described targets include copilots, retrieval-augmented systems, LLM workflows and multi-agent applications. Evaluation considers hallucination, adversarial prompts, sensitive-data leakage and behavioural risks. Governance mapping and ongoing monitoring are part of the assurance story. Regulatory alignment claims require an agreed framework and evidence scope; they do not establish certification.",
    "linkHref": "https://ascendqe.com/mytevv",
    "linkText": "Original source page"
  },
  {
    "id": "entry-7",
    "category": "Products",
    "summary": "<small>Products</small>myP95 \u2014 performance engineering",
    "content": "The performance product spans objectives, workload modelling, scripting, load execution, telemetry, bottleneck diagnosis and optimization. The name refers to the 95th-percentile response-time measure. It is positioned beyond load generation alone, with APM connections, throughput and capacity analysis, repeatable performance testing and integration into delivery processes. Benefit claims on the source page are directional and need workload-specific validation.",
    "linkHref": "https://ascendqe.com/myp95",
    "linkText": "Original source page"
  },
  {
    "id": "entry-8",
    "category": "Products",
    "summary": "<small>Products</small>myUT \u2014 developer-level testing",
    "content": "myUT analyzes existing code and dependencies to identify testable units and generate meaningful unit tests. It considers behaviour, branches, boundaries and negative cases rather than coverage percentage alone. Repository and pull-request workflows connect change-aware generation, execution, coverage and mutation analysis. The intended audience includes developers, engineering leads and QE teams. Framework compatibility and quality gates require project-level confirmation.",
    "linkHref": "https://ascendqe.com/myut",
    "linkText": "Original source page"
  },
  {
    "id": "entry-9",
    "category": "Products",
    "summary": "<small>Products</small>myTDM \u2014 governed test data",
    "content": "myTDM addresses data discovery, synthetic generation, privacy protection, subsetting, validation, provisioning and reuse. Data should preserve relevant schemas, relationships and constraints. The product describes sensitivity detection, masking, lineage and approval controls. Application or schema changes can trigger dataset transformation or revalidation. Intended uses include regression, APIs, automation, integration and repeatable business journeys.",
    "linkHref": "https://ascendqe.com/mytdm",
    "linkText": "Original source page"
  },
  {
    "id": "entry-10",
    "category": "Services",
    "summary": "<small>Services</small>AI-powered QE and automation FAQs",
    "content": "The service combines platform capabilities with delivery across discovery, requirements, test design, automation, execution, diagnostics and readiness. FAQs identify Playwright as the default framework, describe extending existing repositories, and discuss client-hosted models or model endpoints. Private-cloud and on-premise options are described. APIs/plugins and containers connect execution to CI/CD, with diagnostic artifacts returned to delivery tools. Support for encryption, role controls, SSO, audit logs and exportable client-owned artifacts is stated by the vendor; implementation and terms should be checked.",
    "linkHref": "https://ascendqe.com/services/ai-powered-qe",
    "linkText": "Original source page"
  },
  {
    "id": "entry-11",
    "category": "Services",
    "summary": "<small>Services</small>Human-led QE",
    "content": "Services include functional, exploratory, regression, automation, API, mobile, accessibility, performance, data and release-assurance work. Delivery models include independent teams, embedded staff, automation teams and governance teams. India-based English-language delivery can overlap North American, European, Australian and Asia-Pacific time zones. Domain examples include finance, healthcare, retail, telecom and manufacturing. Pricing can use time and materials, scoped fixed fees or measurable outcomes. Onboarding and service levels depend on the engagement.",
    "linkHref": "https://ascendqe.com/services/human-led-qe",
    "linkText": "Original source page"
  },
  {
    "id": "entry-12",
    "category": "Services",
    "summary": "<small>Services</small>Client-preferred AI",
    "content": "AscendQE can operate with the customer\u2019s approved models, cloud platforms, copilots, testing tools and internal frameworks. The intent is to preserve existing technology, data and governance choices while applying QE expertise. Client-preferred delivery is distinct from building a new custom agent. Moving to AscendQE platforms later is described as an incremental option, with reusable test assets and knowledge.",
    "linkHref": "https://ascendqe.com/services/client-preferred-ai",
    "linkText": "Original source page"
  },
  {
    "id": "entry-13",
    "category": "Services",
    "summary": "<small>Services</small>Custom AI agents and copilots",
    "content": "Bespoke work may include requirements analysis, test design, discovery, data generation, automation, execution, defect analysis, repair and reporting. Formats include agents, coordinated multi-agent solutions, copilots, IDE integrations, CLI tools and Git-hook workflows. Integration examples include Jira, Azure DevOps, Xray, Jenkins, GitHub and GitLab. Commercial models include scoped fixed fees, time and materials and outcome-linked work. Ongoing support or handover is separately agreed.",
    "linkHref": "https://ascendqe.com/services/custom-agents",
    "linkText": "Original source page"
  },
  {
    "id": "entry-14",
    "category": "Services",
    "summary": "<small>Services</small>Agent governance and AI assurance",
    "content": "The service evaluates prompts, context, retrieval, grounding, hallucination, tool use, privacy, security, bias, robustness and multi-agent handoffs. It defines acceptance criteria, trust measures, oversight, guardrails and audit evidence. Monitoring and re-evaluation respond to changes in models, prompts, knowledge and tools. Evidence packages can include scenarios, captured inputs/outputs, risk findings, control gaps, remediation and human approvals. Exact standards and integrations follow the customer\u2019s obligations.",
    "linkHref": "https://ascendqe.com/services/agent-governance",
    "linkText": "Original source page"
  },
  {
    "id": "entry-15",
    "category": "Services",
    "summary": "<small>Services</small>QE consulting and transformation",
    "content": "The approach moves through assessment, target-state planning, pilot, scaling and optimization. Assessments consider strategy, maturity, tools, skills, AI readiness, governance, defects, environments and development integration. Outputs can include a maturity scorecard, business case and prioritized roadmap. Other work includes QE Centres of Excellence, operating models, tool evaluation and change management. Engagement structures vary by phase; outcomes should be anchored to a measured baseline.",
    "linkHref": "https://ascendqe.com/services/consulting-transformation",
    "linkText": "Original source page"
  },
  {
    "id": "entry-16",
    "category": "Evidence",
    "summary": "<small>Evidence</small>Expert testimonials",
    "content": "The published testimonials identify Srinivasan Desikan, Managing Director and Chief Consultant at QualPlayers, and Qtp Sudhakar (Sudhakar Kakunuri), Founder and Quality Engineering Leader at VibeTestQ. Desikan discusses the myDiya demonstration, team engagement and practical value. Sudhakar describes favourable initial impressions and an end-to-end walkthrough. These are attributed expert impressions. They do not independently prove production savings, the new subscription economics or performance on every application.",
    "linkHref": "https://ascendqe.com/testimonials",
    "linkText": "Original source page"
  },
  {
    "id": "entry-17",
    "category": "Evidence",
    "summary": "<small>Evidence</small>Case-study claims",
    "content": "The site contains case-study headlines describing a fintech team expanding testing fivefold without extra headcount and a healthcare provider improving testing speed by 70%. Treat these as vendor-published case-study claims. The extracted material did not establish named customers, measurement methods or independent substantiation. Keep them in research context until the underlying stories, approvals and evidence are available.",
    "linkHref": "https://ascendqe.com/case-studies",
    "linkText": "Original source page"
  },
  {
    "id": "entry-18",
    "category": "Commercial",
    "summary": "<small>Commercial</small>Original pricing approach",
    "content": "The original site invites a tailored proposal based on scale, toolchain, governance and desired outcomes. Source metadata mentions cloud, dedicated-tenant and self-deployment options. Product FAQs discuss annual subscriptions, application count, execution volume, users, separately scoped customization and pilot engagements. The new $25K/month starting offer and 12\u00d7 illustrative value model come from this project\u2019s approved commercial direction, not the original public pricing page.",
    "linkHref": "https://ascendqe.com/pricing",
    "linkText": "Original source page"
  },
  {
    "id": "entry-19",
    "category": "Company",
    "summary": "<small>Company</small>Contact, careers and routes",
    "content": "The original contact details are Info@ascendqe.com, +91 93925 76186, and Manjeera Trinity Corporate, Ground Floor, Unit 03, KPHB Phase III, Kukatpally, Hyderabad 500072. The contact page accepts demo requests. The careers page invites applications for AI and quality-engineering roles. The demo/sphere-demo routes are visual demonstrations, not evidence of product benchmark results. Use the original pages for current vacancies and contact submission.",
    "linkHref": "https://ascendqe.com/contact",
    "linkText": "Original source page"
  },
  {
    "id": "entry-20",
    "category": "Policies",
    "summary": "<small>Policies</small>Privacy policy overview",
    "content": "The policy addresses volunteered contact information, device and browsing information, use for service operations and communications, sharing circumstances, cookies, security measures, location-dependent privacy rights and children\u2019s information. It acknowledges that no transmission or storage method is completely secure. This reference is a topic summary, not a replacement for the operative policy. Read the linked page for the full current terms.",
    "linkHref": "https://ascendqe.com/privacy",
    "linkText": "Original source page"
  },
  {
    "id": "entry-21",
    "category": "Policies",
    "summary": "<small>Policies</small>Terms of service overview",
    "content": "The terms address access and acceptable use, account accuracy and security, intellectual property, commercial permissions, service availability, payment, termination, liability, indemnification and changes to terms. The source specifies US governing-law language. This is an informational index, not legal advice or a substitute for the published terms and executed customer agreement.",
    "linkHref": "https://ascendqe.com/terms",
    "linkText": "Original source page"
  }
];

export const ReferencePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const detailsRefs = useRef<(HTMLDetailsElement | null)[]>([]);

  const q = search.toLowerCase().trim();
  const visibleEntries = entriesData.filter((entry) => {
    if (!q) return true;
    const text = (entry.summary + " " + entry.content + " " + entry.category).toLowerCase();
    return text.includes(q);
  });

  const handleExpandAll = () => {
    detailsRefs.current.forEach((el) => {
      if (el && !el.hidden) el.open = true;
    });
  };

  const handleCollapseAll = () => {
    detailsRefs.current.forEach((el) => {
      if (el) el.open = false;
    });
  };

  return (
    <main>
      <section className="page-intro">
        <div className="eyebrow">ORIGINAL WEBSITE · REFERENCE SNAPSHOT</div>
        <h1>
          All the context.<br />
          <span>Outside the sales pitch.</span>
        </h1>
        <p>
          Organized summaries of AscendQE’s published products, services, FAQs, company information and policies.
        </p>
        <p className="fine">
          Reviewed 9 October 2026 (India). Source: public ascendqe.com pages. Summarized for evaluation; see original routes below.
        </p>
      </section>

      <section className="section reference-section">
        <div className="reference-controls">
          <label htmlFor="reference-search">Search the reference</label>
          <input
            id="reference-search"
            type="search"
            placeholder="Filter by topic, product, claim or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="reference-buttons">
            <button id="expand-reference" type="button" onClick={handleExpandAll}>
              Expand all
            </button>
            <button id="collapse-reference" type="button" onClick={handleCollapseAll}>
              Collapse all
            </button>
            <a className="button" download="AscendQE-source-reference.txt" href={dlHref}>
              Download source brief
            </a>
            <span id="reference-count">
              {visibleEntries.length} of {entriesData.length} reference topics
            </span>
          </div>
        </div>

        <p className="fine">
          The new offer is 5K/month with an annual commitment. Product catalogue entries below do not automatically define what is included.
        </p>

        {entriesData.map((entry, idx) => {
          const isVisible = visibleEntries.some((v) => v.id === entry.id);
          return (
            <details
              key={entry.id}
              ref={(el) => (detailsRefs.current[idx] = el)}
              className="source-entry"
              data-category={entry.category}
              hidden={!isVisible}
            >
              <summary dangerouslySetInnerHTML={{ __html: entry.summary }} />
              <p dangerouslySetInnerHTML={{ __html: entry.content }} />
              <a href={entry.linkHref} target="_blank" rel="noopener noreferrer">
                {entry.linkText}
              </a>
            </details>
          );
        })}

        <div className="source-links">
          <h2>Other original routes</h2>
          <a href="https://ascendqe.com/services" target="_blank" rel="noopener noreferrer">
            Service overview
          </a>{" "}
          ·{" "}
          <a href="https://ascendqe.com/careers" target="_blank" rel="noopener noreferrer">
            Careers
          </a>{" "}
          ·{" "}
          <a href="https://ascendqe.com/demo" target="_blank" rel="noopener noreferrer">
            Visual demo
          </a>{" "}
          ·{" "}
          <a href="https://ascendqe.com/" target="_blank" rel="noopener noreferrer">
            Home
          </a>
        </div>
      </section>
    </main>
  );
};