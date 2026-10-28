import { WorkflowStep } from '../types';

export const workflowSteps: WorkflowStep[] = [
  {
    id: 'automate',
    number: '01 / AUTOMATE',
    title: 'Automate',
    headline: 'From test intent to executable automation.',
    description: 'Start with agreed business behaviour, assertions and test data. Generate automation in the agreed application and framework context.',
    example: 'Illustrative input: a customer completes checkout and receives an order confirmation.',
  },
  {
    id: 'execute',
    number: '02 / EXECUTE',
    title: 'Execute',
    headline: 'Run the test. Keep the evidence.',
    description: 'Execute against the agreed environment. Inspect the results and distinguish application defects, environment issues and automation failures.',
    example: 'Review: execution result · assertions · diagnostics · evidence',
  },
  {
    id: 'gaps',
    number: '03 / FIND THE GAPS',
    title: 'Find the gaps',
    headline: 'A green test. An uncovered journey?',
    description: 'Review coverage and traceability to identify requirements or paths that still lack suitable test evidence.',
    example: 'Illustrative gap: successful payment covered; declined-payment recovery not yet covered.',
  },
  {
    id: 'impact',
    number: '04 / CONNECT THE IMPACT',
    title: 'Connect the impact',
    headline: 'One change. Which modules feel it?',
    description: 'Use available relationships across requirements, application modules and test assets to assess likely impact.',
    example: 'Illustrative connection: payment-provider change → checkout flow → payment tests → order confirmation',
  },
  {
    id: 'prioritize',
    number: '05 / PRIORITIZE',
    title: "Know what's next",
    headline: 'Know what to test next.',
    description: 'Combine impact, gaps and risk context to suggest the next tests and modules to investigate. Keep human review in the decision.',
    example: 'Illustrative next test: verify declined-payment recovery before the next release.',
  },
];

