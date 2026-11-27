// Proof Level self-check (PS-1 v0.1): ten yes/no questions, each testing one level.

export interface ProofLevelQuestion {
  /** The level this question tests; answering "No" places the system one level below. */
  level: number;
  question: string;
  hint: string;
}

export interface ProofLevelResult {
  name: string;
  means: string;
  next: string;
  offer: string;
  ctaLabel: string;
  ctaHref: string;
}

export const PROOF_LEVEL_QUESTIONS: ProofLevelQuestion[] = [
  {
    level: 2,
    question: 'Is “fit to ship” written down, with thresholds, before testing starts?',
    hint: 'For example: wrong answers below 1%, every claim journey passing.',
  },
  {
    level: 2,
    question: 'Are your critical journeys named, with owners and scenarios?',
    hint: 'The flows that would hurt customers or revenue if they broke.',
  },
  {
    level: 2,
    question: 'Is coverage measured against those scenarios, not against test counts?',
    hint: '“41 of 51 claim scenarios covered”, not “3,200 tests”.',
  },
  {
    level: 3,
    question: 'Does every claim in your last release report link to an evidence ID?',
    hint: 'A reader could open the proof behind each line.',
  },
  {
    level: 3,
    question: 'Can each result be rerun from what was recorded?',
    hint: 'Same data, same build, same settings, same result.',
  },
  {
    level: 3,
    question: 'Do results on AI behaviour state the sample size and confidence?',
    hint: '“3.1% of 2,000 cases, 95% interval 2.4–4.0%.”',
  },
  {
    level: 4,
    question: 'Was your last release decided by a signed Ship, Fix or Stop?',
    hint: 'A named person, a date, and the conditions attached.',
  },
  {
    level: 4,
    question: 'Was the signer independent of the team that built and tested it?',
    hint: 'No one marks their own homework.',
  },
  {
    level: 5,
    question: 'Is live behaviour scored against the same specification used at release?',
    hint: 'Production answers checked against the same limits.',
  },
  {
    level: 5,
    question: 'Is the evidence record under a quarter old, and mapped to the rules that apply?',
    hint: 'For example RBI FREE-AI, NIST AI RMF or ISO/IEC 42001.',
  },
];

/** Index = Proof Level (0–5). */
export const PROOF_LEVEL_RESULTS: ProofLevelResult[] = [
  {
    name: 'Unproven',
    means: 'Tests aren’t run or aren’t recorded.',
    next: 'In a fixed-price Proof Sprint we define fit-to-ship, map your critical journeys and give one system its first signed verdict.',
    offer: 'Proof Sprint',
    ctaLabel: 'Start a Proof Sprint',
    ctaHref: '/start',
  },
  {
    name: 'Activity',
    means: 'Tests run and get counted, but nothing says what “fit to ship” means.',
    next: 'In a fixed-price Proof Sprint we define fit-to-ship, map your critical journeys and give one system its first signed verdict.',
    offer: 'Proof Sprint',
    ctaLabel: 'Start a Proof Sprint',
    ctaHref: '/start',
  },
  {
    name: 'Coverage',
    means: 'You know what matters and you cover it. The proof behind each result isn’t traceable yet.',
    next: 'Put an evidence ID on every result, make each one rerunnable, and state confidence on AI behaviour.',
    offer: 'Test automation and AI assurance',
    ctaLabel: 'See what we do',
    ctaHref: '/services',
  },
  {
    name: 'Evidence',
    means: 'Your results are traceable and rerunnable. The release decision isn’t yet independent and signed.',
    next: 'An independent principal reads the evidence and signs [Ship], [Fix] or [Stop] for your next release.',
    offer: 'AI and agent assurance',
    ctaLabel: 'See AI assurance',
    ctaHref: '/services#ai',
  },
  {
    name: 'Verdict',
    means: 'Releases are decided on signed, independent evidence. Proof stops at launch.',
    next: 'Score live behaviour every day against the release specification, and keep the record mapped to your rules.',
    offer: 'AI assurance after launch',
    ctaLabel: 'See AI assurance',
    ctaHref: '/services#ai',
  },
  {
    name: 'Continuous',
    means: 'You prove it before release and keep proving it after. Few teams are here.',
    next: 'Have the claim assessed independently, so boards, auditors and customers can rely on it.',
    offer: 'Independent assessment',
    ctaLabel: 'Talk to us',
    ctaHref: '/start',
  },
];

/** Heights (%) of the six stairs drawn in the result. */
export const STAIR_HEIGHTS = [16, 30, 46, 62, 80, 100];
