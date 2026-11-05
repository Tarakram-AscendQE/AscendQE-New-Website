import {
  Receipt,
  Users,
  Scale,
  BellRing,
  TrendingDown,
  MessageSquareCode,
  Cloud,
  Cpu,
  Server,
  Code2,
  FileSpreadsheet,
  Building2,
  Briefcase,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export interface CapabilityItem {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 1,
    title: 'Every bill in one ledger',
    description: 'Cloud, AI, hosting and SaaS costs collected in one place and synced every 6 hours.',
    icon: Receipt,
  },
  {
    id: 2,
    title: 'Every cost has an owner',
    description: 'Allocation rules assign each cost to a department, project and person as it arrives.',
    icon: Users,
  },
  {
    id: 3,
    title: 'Invoices that add up',
    description: 'Usage, invoice and payment side by side, with every difference explained: tax, credits, refunds or a missing payment.',
    icon: Scale,
  },
  {
    id: 4,
    title: 'Budgets that warn early',
    description: 'Owners hear about it at 80%, not after the invoice.',
    icon: BellRing,
  },
  {
    id: 5,
    title: 'Savings you can prove',
    description: 'Idle seats, leavers still licensed and waste found, then tracked until the money is saved.',
    icon: TrendingDown,
  },
  {
    id: 6,
    title: 'Ask in plain English',
    description: 'Copilot answers from your live data and respects who can see what.',
    icon: MessageSquareCode,
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
    title: 'Collect',
    description: 'Costs, invoices and seats sync every 6 hours.',
  },
  {
    step: 2,
    title: 'Allocate',
    description: 'Rules give each cost a department, project and person.',
  },
  {
    step: 3,
    title: 'Reconcile',
    description: 'Usage, invoices and payments matched each month.',
  },
  {
    step: 4,
    title: 'Act',
    description: 'Budgets, alerts, renewals and savings with an owner.',
  },
];

export const WORKFLOW_OUTPUTS = [
  'Live dashboard',
  'Budgets and alerts',
  'Reconciled invoices',
  'Savings tracker',
  'Executive brief',
  'Ask Copilot',
];

export interface ConnectorCategory {
  title: string;
  subtitle: string;
  chips: string[];
  isDashed?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export const CONNECTOR_CATEGORIES: ConnectorCategory[] = [
  {
    title: 'Cloud',
    subtitle: 'Daily cost by service and account',
    chips: ['AWS', 'Microsoft Azure', 'Google Cloud'],
    icon: Cloud,
  },
  {
    title: 'AI models',
    subtitle: 'Spend per model, key and team',
    chips: ['OpenAI', 'Claude', 'OpenRouter', 'Cursor'],
    icon: Cpu,
  },
  {
    title: 'Hosting and infrastructure',
    subtitle: 'Invoices and usage from your hosts',
    chips: ['Hetzner', 'DigitalOcean', 'Cloudflare', 'Vercel', 'Render', 'MongoDB Atlas'],
    icon: Server,
  },
  {
    title: 'Developer and data tools',
    subtitle: 'Seats, usage and platform spend',
    chips: ['GitHub', 'GitLab', 'Azure DevOps', 'Jira', 'Xray', 'Atlassian Cloud', 'Datadog', 'Snowflake'],
    icon: Code2,
  },
  {
    title: 'Seats and directory',
    subtitle: 'Who holds a licence, and who has left',
    chips: ['Slack', 'Zoom', 'Salesforce', 'Figma', 'Google Workspace', 'Microsoft 365'],
    icon: Users,
  },
  {
    title: 'Everything else',
    subtitle: 'Card statements, invoices and bank exports',
    chips: ['CSV import'],
    isDashed: true,
    icon: FileSpreadsheet,
  },
];

export interface UserRole {
  role: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const USER_ROLES: UserRole[] = [
  {
    role: 'Finance',
    description: 'Invoices matched to usage and payments, budgets by cost centre, monthly reports.',
    icon: Building2,
  },
  {
    role: 'Engineering leads',
    description: 'Cloud and AI spend per team, project and model.',
    icon: Code2,
  },
  {
    role: 'IT and procurement',
    description: 'Seats, leavers, renewals, contracts and purchase approvals.',
    icon: Briefcase,
  },
  {
    role: 'Leadership',
    description: 'A two-page brief on run-rate, trends and savings.',
    icon: TrendingDown,
  },
];

export const SECURITY_FEATURES = [
  'Single sign-on with Google or Microsoft',
  'Two-factor sign-in for owners and admins',
  'Read-only access to your vendors, credentials encrypted',
  'Each organization’s data kept separate',
  'Audit log of every change',
];

export interface ReconciliationRow {
  month: string;
  usage: string;
  invoiced: string;
  paid: string;
  status: string;
  variant: 'matched' | 'tax' | 'warning';
}

export const SAMPLE_RECONCILIATION: ReconciliationRow[] = [
  {
    month: 'Aug',
    usage: '$8,940',
    invoiced: '$8,940',
    paid: '$8,940',
    status: 'Matched',
    variant: 'matched',
  },
  {
    month: 'Sep',
    usage: '$9,140',
    invoiced: '$9,155',
    paid: '$9,155',
    status: 'Tax explained',
    variant: 'tax',
  },
  {
    month: 'Oct',
    usage: '$9,675',
    invoiced: '$9,690',
    paid: '$4,200',
    status: 'Part-paid',
    variant: 'warning',
  },
];

