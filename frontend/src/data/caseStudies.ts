// Single source for all case studies. Add a new category or case study here and the pages update automatically.

export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
};

export type Stat = { value: string; label: string };
export type Step = { specialist: string; role: string; action: string; result: string };

export type Block =
  | { type: "text"; title: string; body: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "quote"; title: string; body: string }
  | { type: "steps"; title: string; intro?: string; steps: Step[] }
  | { type: "timeline"; title: string; items: { when: string; what: string }[] }
  | { type: "stats"; title: string; stats: Stat[] }
  | { type: "compare"; title: string; rows: { measure: string; before: string; after: string }[] }
  | { type: "breakdown"; title: string; items: { label: string; count: number; percent: number }[] };

export type CaseStudy = {
  slug: string;
  category: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  headlineStats: Stat[];
  tags: string[];
  sample?: boolean;
  blocks: Block[];
};

export const categories: Category[] = [
  {
    slug: "regression-automation",
    name: "Regression Automation",
    tagline: "From days of manual testing to hours of unattended runs.",
    description:
      "How the crew turns large manual regression suites into reviewed, reusable automation across browsers and APIs.",
  },
  {
    slug: "self-healing-triage",
    name: "Self-healing & Triage",
    tagline: "Separate broken tests from real bugs, then fix only what should be fixed.",
    description:
      "How the crew classifies failures, repairs automation defects with human approval and keeps real product bugs visible.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "retail-banking-portal-regression",
    category: "regression-automation",
    title: "Regression automation for a retail banking portal",
    client: "Northfield Bank",
    industry: "Retail banking",
    sample: true,
    summary:
      "620 manual test cases, 5 testers and 3 days per release. One intent later, 87% of the regression suite runs unattended in 4.5 hours.",
    headlineStats: [
      { value: "87%", label: "of regression cases automated (540 of 620)" },
      { value: "4.5 hrs", label: "regression cycle per release (was 3 days)" },
      { value: "23", label: "defects found in first run (4 high)" },
      { value: "108 hrs", label: "manual effort saved per release" },
    ],
    tags: ["UI + API", "3-browser matrix", "Jenkins", "Human review"],
    blocks: [
      {
        type: "text",
        title: "The client",
        body: "A mid-size bank ran its customer portal regression entirely by hand: 620 test cases, tested by 5 testers over 3 days for every fortnightly release. Release windows kept slipping and testers had no time for exploratory work.",
      },
      {
        type: "list",
        title: "Setup by the Project Admin",
        items: [
          "Created a project on the Automation QE Platform and uploaded the baselined requirements and business rules (48 documents) into the project RAG store.",
          "Connected the Git repository and the Jenkins pipeline; stored all credentials as Vault references.",
          "Set the framework and language, a 3-browser matrix (Chrome, Edge, Firefox), 8 parallel workers and a retry policy of 1 rerun.",
          "Passed readiness validation, then activated the flow and added 4 Project Members and 2 Viewers.",
        ],
      },
      {
        type: "quote",
        title: "One intent",
        body: "Automate the login, fund transfer and statement flows.",
      },
      {
        type: "steps",
        title: "How the crew handled it",
        intro: "myHelm checked the role and project scope, created a mission with an audit ID and routed it through the fixed flow.",
        steps: [
          { specialist: "Sherpa", role: "Brief", action: "Turned the intent into a scoped brief tied to the uploaded requirements", result: "3 flows, 62 requirements in scope" },
          { specialist: "Scout", role: "Discover", action: "Crawled the portal and its APIs", result: "84 screens, 1,240 fields, 96 API endpoints" },
          { specialist: "Sage", role: "Design", action: "Proposed positive, negative and boundary scenarios", result: "540 scenarios incl. transfer-limit and invalid-amount cases" },
          { specialist: "Trace", role: "Prepare", action: "Generated valid, invalid, boundary and duplicate data and kept it for reuse", result: "1,850 data sets" },
          { specialist: "Bit", role: "Automate", action: "Wrote UI and API automation using the approved repository patterns", result: "540 automated tests, 3 pull requests" },
          { specialist: "Sentry", role: "Review", action: "Put code and data in front of human reviewers before merge", result: "21 review comments, all resolved" },
          { specialist: "Dash", role: "Run", action: "Executed suites across the browser matrix and collected evidence", result: "Logs, screenshots, videos and traces per test" },
          { specialist: "Atlas", role: "Manage", action: "Kept missions, results and audit together for the team", result: "One dashboard for all runs" },
        ],
      },
      {
        type: "timeline",
        title: "Timeline",
        items: [
          { when: "Week 1", what: "Project setup, document upload, integrations, readiness validation" },
          { when: "Week 2", what: "Discovery and test design; reviewer sign-off on scenarios" },
          { when: "Weeks 3–4", what: "Test data and automation generation; human code review and merge" },
          { when: "Week 5", what: "First full run across 3 browsers; defect triage with the client" },
        ],
      },
      {
        type: "compare",
        title: "Before and after",
        rows: [
          { measure: "Regression cycle", before: "3 days, 5 testers (about 120 person-hours)", after: "4.5 hours unattended plus about 12 person-hours of review" },
          { measure: "Cases still manual", before: "620", after: "80 (exploratory and visual checks)" },
          { measure: "Defects escaping to production", before: "Baseline", after: "38% fewer over the next 3 releases" },
          { measure: "Release cadence", before: "Slipped about 1 in 3 releases", after: "No slips in 3 releases" },
        ],
      },
    ],
  },
  {
    slug: "ui-framework-upgrade-self-healing",
    category: "self-healing-triage",
    title: "Tests break after a UI framework upgrade",
    client: "Northfield Bank",
    industry: "Retail banking",
    sample: true,
    summary:
      "A front-end upgrade failed 216 of 540 tests overnight. The crew classified every failure, healed 92% of broken automation and raised 9 real defects in 3 hours.",
    headlineStats: [
      { value: "92%", label: "of automation failures repaired automatically" },
      { value: "9", label: "real defects raised, none masked" },
      { value: "3 hrs", label: "triage time (manual estimate: 2.5 days)" },
      { value: "6%", label: "failures after the next UI update (was 40%)" },
    ],
    tags: ["Self-healing", "Failure triage", "Locator strategy"],
    blocks: [
      {
        type: "text",
        title: "The challenge",
        body: "Two weeks after go-live, the bank upgraded its front-end framework. The next nightly run failed 216 of 540 tests (40%). On the dashboard every failure looked the same, so the team could not tell real defects from broken locators or a slow environment. Manual triage was estimated at 2.5 days.",
      },
      {
        type: "list",
        title: "Why it was hard",
        items: [
          "Three different causes were mixed together: changed locators, genuine application bugs and environment timeouts.",
          "Re-running everything would have wasted a night; healing everything blindly could have hidden real defects.",
        ],
      },
      {
        type: "breakdown",
        title: "Classification of the 216 failed tests",
        items: [
          { label: "Automation defects", count: 171, percent: 79 },
          { label: "Environment", count: 36, percent: 17 },
          { label: "Application defects", count: 9, percent: 4 },
        ],
      },
      {
        type: "steps",
        title: "How it was overcome",
        steps: [
          { specialist: "Dash", role: "Run", action: "Evidence was already captured for every failure", result: "216 failures with screenshots, traces and logs" },
          { specialist: "Pip", role: "Investigate", action: "Analysed the evidence and classified each failure", result: "171 automation, 9 application, 36 environment" },
          { specialist: "Patch", role: "Repair", action: "Repaired only the automation defects by updating locators, then re-ran them", result: "158 of 171 healed (92%); all passed on re-run; 13 flagged for manual rewrite" },
          { specialist: "Sentry", role: "Review", action: "Sent every proposed fix to a human reviewer before it was applied", result: "158 fixes approved by 2 reviewers in about 40 minutes" },
          { specialist: "Dash", role: "Run", action: "Re-ran environment failures under the approved retry policy", result: "33 of 36 passed; 3 escalated to the environment team" },
          { specialist: "Yeti", role: "Improve", action: "Recommended stable locator strategies (test IDs, role-based selectors)", result: "410 selectors moved to test IDs" },
          { specialist: "Echo", role: "Collaborate", action: "Shared the triage summary and raised the real defects with developers", result: "9 application defects logged with evidence" },
        ],
      },
      {
        type: "quote",
        title: "Lesson",
        body: "The platform repaired only failures that were automation defects, and a human approved each fix before it landed. That kept self-healing from hiding genuine product bugs, and the locator improvements made the suite far more resilient to the next UI change.",
      },
    ],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getStudiesByCategory = (slug: string) => caseStudies.filter((s) => s.category === slug);
export const getStudy = (category: string, slug: string) =>
  caseStudies.find((s) => s.category === category && s.slug === slug);
