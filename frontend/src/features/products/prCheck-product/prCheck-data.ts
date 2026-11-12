import {
  Shield,
  FileCheck,
  GitPullRequest,
  CheckCircle2,
  Lock,
  FileSpreadsheet,
  Layers,
  AlertTriangle,
  GitCommit,
  Scale,
  Users,
  Briefcase,
  Code2,
} from 'lucide-react';

export interface GapCard {
  title: string;
  description: string;
  isHighlight?: boolean;
}

export const GAP_CARDS: GapCard[] = [
  {
    title: 'The story',
    description: 'What the team was asked to build. Tested by the team.',
  },
  {
    title: 'The rules',
    description: 'What must never break, whatever is built. Usually checked too late.',
  },
  {
    title: 'The gap',
    description: 'Where incidents, audit findings and fraud come from. PRCheck.live closes it on every pull request.',
    isHighlight: true,
  },
];

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: 'Connect',
    description: 'Link your GitHub repository, Jira, Xray and QE environment. Every connection is tested before it is saved.',
  },
  {
    step: 2,
    title: 'Codify the rules',
    description: 'Your existing controls become policy-as-code, owned and approved by Finance, Security and Compliance.',
  },
  {
    step: 3,
    title: 'Verify every PR',
    description: 'On each push, PRCheck.live confirms which build is running, then runs its own independent checks against it.',
  },
  {
    step: 4,
    title: 'Gate and prove',
    description: 'The verdict appears on the pull request as a required check, with sealed evidence for release and audit.',
  },
];

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const FEATURES: FeatureItem[] = [
  {
    id: 'independent',
    title: 'Independent by design',
    description: 'Checks are written from your policies, never from the team’s code, tests or stories. No one marks their own homework.',
    icon: Scale,
  },
  {
    id: 'proves-build',
    title: 'Proves the exact build',
    description: 'Verifies only when the test environment reports the pull request’s commit. Otherwise: no verdict, never a false pass.',
    icon: GitCommit,
  },
  {
    id: 'rules-owned',
    title: 'Rules owned by their owners',
    description: 'Policies live in a reviewed repository. Only the owning authority can change a rule or approve an exception.',
    icon: Users,
  },
  {
    id: 'merge-gate',
    title: 'A real merge gate',
    description: 'NOT READY blocks the merge on GitHub. READY applies to that commit only; every new push is checked again.',
    icon: GitPullRequest,
  },
  {
    id: 'sealed-evidence',
    title: 'Sealed evidence',
    description: 'Every input and observation is stored write-once and fingerprinted. Tampered evidence is refused.',
    icon: Lock,
  },
  {
    id: 'audit-ready',
    title: 'Built for audit',
    description: 'Trace any change from story to pull request, commit, rules and evidence: the chain RBI, SOX and ISO auditors ask for.',
    icon: FileCheck,
  },
];

export interface RoleItem {
  role: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ROLE_ITEMS: RoleItem[] = [
  {
    role: 'Compliance and Risk',
    description: 'See every change your rules apply to, with evidence, before it ships.',
    icon: Shield,
  },
  {
    role: 'Security',
    description: 'Masking, access and session rules checked on each change, not once a year.',
    icon: Lock,
  },
  {
    role: 'Engineering',
    description: 'Clear findings on the pull request: the rule, its owner, and what was observed.',
    icon: Code2,
  },
  {
    role: 'QA and Assurance',
    description: 'Independent checks that complement your test suite, with a queue of what needs attention.',
    icon: CheckCircle2,
  },
  {
    role: 'Release and Audit',
    description: 'Know what is READY, what it covers, and the proof behind it.',
    icon: FileCheck,
  },
];

export interface ExampleRow {
  commit: string;
  teamTests: string;
  prCheckStatus: 'READY' | 'NOT READY';
  why: string;
}

export const EXAMPLE_ROWS: ExampleRow[] = [
  {
    commit: 'Commit 1',
    teamTests: '25/25 passed',
    prCheckStatus: 'NOT READY',
    why: 'A requester could approve their own change; scheduled payments not held',
  },
  {
    commit: 'Commit 2',
    teamTests: '26/26 passed',
    prCheckStatus: 'NOT READY',
    why: 'Self-approval fixed; payments still not held. The story never mentioned it, Finance’s rule did',
  },
  {
    commit: 'Commit 3',
    teamTests: '29/29 passed',
    prCheckStatus: 'READY',
    why: 'All fourteen rules supported. Merge unblocked',
  },
];

export const INTEGRATION_CHIPS = [
  'GitHub',
  'Jira',
  'Xray',
  'Playwright',
  'Your QE environment',
  'SSO-ready',
];

export const SAFE_ADOPT_POINTS = [
  'Works on your test environment with test data. No production access.',
  'Credentials encrypted; role-based access enforced on the server.',
  'Admins configure, but cannot change verdicts, rules or checks.',
  'Complements your testing. It does not replace it.',
];

