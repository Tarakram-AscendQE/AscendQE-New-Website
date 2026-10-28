export type OfferType = 'challenge' | 'platform' | 'managed';

export interface WorkflowStep {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  example: string;
}

export interface CalculatorInputs {
  volume: number;        // new accepted test cases / year
  hours: number;         // current hours / test case
  rate: number;          // engineer cost / hour ($)
  operatingCost: number; // platform operating cost / case ($)
  extras: number;        // other incremental costs / year ($)
  years: number;         // 1 or 3
}

export interface CalculatorOutputs {
  baselineCost: number;
  deliveredCost: number;
  netSaving: number;
  roiPercent: number;
  deliveredPercent: number;
  isPositive: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceFormatted: string;
  period: string;
  commitmentNote: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isPrimary?: boolean;
  finePrint: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReferenceTopic {
  id: string;
  category: 'Company' | 'Products' | 'Services' | 'Evidence' | 'Commercial' | 'Policies';
  title: string;
  summary: string;
  fullContent: string[];
  links?: { label: string; href: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  context: string;
}

