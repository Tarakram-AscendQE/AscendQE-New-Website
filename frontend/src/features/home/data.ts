import { StepItem, MapNode, ModeData, CrewBot } from './types';

export const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const STEPS: StepItem[] = [
  {
    label: 'Brief',
    title: 'Every ascent starts with a goal.',
    description:
      'Sherpa turns “our customer must be able to complete checkout” into a clear brief, with agreed scope and acceptance criteria.',
    actors: ['sherpa'],
    next: ['scout', 'sage'],
    parcel: 'Test intent',
    checkpoint: 'BASE CAMP / SET THE MISSION',
    branch: 'Define what success looks like before the climb.',
  },
  {
    label: 'Discover',
    title: 'Map the terrain. Find the gaps.',
    description:
      'Scout explores the application. Sage turns the journey into test scenarios: a successful purchase, an invalid payment and an empty basket.',
    actors: ['scout', 'sage'],
    next: ['trace'],
    parcel: 'Flows + scenarios',
    checkpoint: 'CHECKPOINT 02 / UNDERSTAND THE TERRAIN',
    branch: 'The brief becomes a plan grounded in application behaviour.',
  },
  {
    label: 'Prepare',
    title: 'Give every test the right context.',
    description:
      'Trace prepares the customer, basket and payment data, and keeps each scenario connected to its requirement and evidence.',
    actors: ['trace'],
    next: ['bit'],
    parcel: 'Scenarios + data',
    checkpoint: 'CHECKPOINT 03 / PREPARE FOR THE CLIMB',
    branch: 'Context travels with the work. The next agent does not start from zero.',
  },
  {
    label: 'Automate',
    title: 'Turn the route into runnable tests.',
    description:
      'Bit generates automation that fits your framework, with checks for the expected outcome at each step of the checkout journey.',
    actors: ['bit'],
    next: ['dash'],
    parcel: 'Runnable tests',
    checkpoint: 'CHECKPOINT 04 / BUILD THE ROUTE',
    branch: 'Test intent, data and expected results stay connected.',
  },
  {
    label: 'Run',
    title: 'Find out what actually works.',
    description:
      'Dash executes the suite and captures results, logs, screenshots and traces. The crew gets evidence to work with.',
    actors: ['dash'],
    next: ['pip', 'patch'],
    parcel: 'Results + evidence',
    checkpoint: 'CHECKPOINT 05 / TEST THE PATH',
    branch: 'Failures move into investigation; they are not hidden behind a green badge.',
  },
  {
    label: 'Resolve',
    title: 'A failure is a clue. Follow it.',
    description:
      'Pip investigates. Patch repairs eligible automation issues and reruns the tests. Product bugs and uncertain repairs go to an engineer.',
    actors: ['pip', 'patch'],
    next: ['sentry'],
    parcel: 'Verified results',
    checkpoint: 'CHECKPOINT 06 / RESOLVE AND RETEST',
    branch:
      'Controlled repair → rerun. Product bug or uncertainty → engineer review. No silent pass.',
  },
  {
    label: 'Review',
    title: 'Check the evidence before the summit.',
    description:
      'Sentry checks the agreed quality gates, coverage and unresolved defects. Your team can see what is ready and what still needs work.',
    actors: ['sentry'],
    next: ['yeti'],
    parcel: 'Readiness summary',
    checkpoint: 'CHECKPOINT 07 / REVIEW THE GATES',
    branch: 'Unmet gate? Resolve the gap and retest. Configured human approvals still apply.',
  },
  {
    label: 'Improve',
    title: 'One peak reached. A clearer next climb.',
    description:
      'Yeti brings the findings together. Your team makes the release decision, and the next change carries the learning into a new brief.',
    actors: ['yeti'],
    next: ['sherpa'],
    parcel: 'Next test priorities',
    checkpoint: 'THE NEXT PEAK / CONTINUOUS IMPROVEMENT',
    branch: 'People own the release decision. The next change starts the learning loop again.',
  },
];

export const MAP_NODES: MapNode[] = [
  { cx: 65, cy: 204, textY: 186, label: '01' },
  { cx: 201, cy: 180, textY: 162, label: '02' },
  { cx: 337, cy: 169, textY: 151, label: '03' },
  { cx: 473, cy: 143, textY: 125, label: '04' },
  { cx: 609, cy: 129, textY: 111, label: '05' },
  { cx: 745, cy: 102, textY: 84, label: '06' },
  { cx: 881, cy: 74, textY: 56, label: '07' },
  { cx: 1017, cy: 40, textY: 22, textX: 990, label: '08' },
];

export const MODES: Record<'qe' | 'ai', ModeData> = {
  qe: {
    title: 'Give QE its own intelligence.',
    description:
      'Put application understanding, test creation, execution and change analysis into one connected workflow.',
    checks: [
      'Discover what your application does',
      'Create and run tests with context',
      'Connect failures, coverage and change',
    ],
    mission: 'Mission: validate the changed checkout flow',
    rows: [
      ['Application context', 'UNDERSTAND'],
      ['Tests + execution evidence', 'CREATE / RUN'],
      ['Coverage + change impact', 'ADAPT'],
      ['Human review', 'DECIDE'],
    ],
  },
  ai: {
    title: 'Test the experience AI delivers.',
    description:
      'Look beyond a model response. Evaluate the AI application, the workflows around it and the experience your customer receives.',
    checks: [
      'Evaluate behaviour and response quality',
      'Test the complete application workflow',
      'Examine safety, robustness and trust',
    ],
    mission: 'Mission: evaluate an AI support assistant',
    rows: [
      ['Response quality + behaviour', 'EVALUATE'],
      ['Application + agent workflow', 'TEST'],
      ['Safety + robustness evidence', 'ASSESS'],
      ['Human review', 'DECIDE'],
    ],
  },
};

export const CREW_BOTS: CrewBot[] = [
  { bot: 'Sherpa', role: 'Brief', className: 'sherpa', idx: 0 },
  { bot: 'Scout', role: 'Discover', className: 'scout', idx: 1 },
  { bot: 'Sage', role: 'Design', className: 'sage', idx: 2 },
  { bot: 'Trace', role: 'Prepare', className: 'trace', idx: 3 },
  { bot: 'Bit', role: 'Automate', className: 'bit', idx: 4 },
  { bot: 'Dash', role: 'Run', className: 'dash', idx: 5 },
  { bot: 'Pip', role: 'Investigate', className: 'pip', idx: 6 },
  { bot: 'Patch', role: 'Repair', className: 'patch', idx: 7 },
  { bot: 'Sentry', role: 'Review', className: 'sentry', idx: 8 },
  { bot: 'Yeti', role: 'Improve', className: 'yeti', idx: 9 },
];

