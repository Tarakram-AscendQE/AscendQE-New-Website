import { PricingPlan, FaqItem } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'platform',
    name: 'PRIVATE ENTERPRISE PLATFORM',
    tagline: 'Your platform. Your environment.',
    priceFormatted: '$25K',
    period: '/ month',
    commitmentNote: 'Monthly billing · annual commitment ($300K/year)',
    features: [
      'Configured for your applications and workflows',
      'Agreed private deployment and capacity within your environment',
      'Connected automation, execution and quality insights',
      'Support and updates within contracted scope',
      'Continuous traceability and change impact analysis',
    ],
    ctaLabel: 'Prove it on my application',
    ctaHref: '/start?offer=platform',
    isPrimary: true,
    finePrint: 'Operating costs, bespoke work and managed services additional.',
  },
  {
    id: 'managed',
    name: 'MANAGED SERVICES',
    tagline: 'Small QA team? We can run it for you.',
    priceFormatted: "Let's scope it.",
    period: '',
    commitmentNote: 'We love startups like us · Tailored engagement',
    features: [
      'Agree the applications and test portfolio together',
      'Scope creation, execution and ongoing maintenance',
      'Define clear reporting and response service commitments',
      'Choose the responsibilities you want us to own',
      'Dedicated QE expertise without scaling internal QA headcount',
    ],
    ctaLabel: 'Discuss my managed service',
    ctaHref: '/start?offer=managed',
    isPrimary: false,
    finePrint: 'Custom quote. Platform access and operating costs are itemized in the proposal.',
  },
];

export const pricingFaqs: FaqItem[] = [
  {
    question: 'Can we discuss monthly payments?',
    answer: 'The starting offer is $25,000/month with a 12-month commitment, totaling $300,000/year. Operating costs are additional. Monthly billing does not mean cancel-anytime; payment and termination terms belong in the commercial agreement.',
  },
  {
    question: 'What does "configured for you" include?',
    answer: 'Agreed application onboarding, deployment and workflow configuration within your infrastructure. Bespoke development, additional integrations, and expanded capacity are separately scoped.',
  },
  {
    question: 'What does managed service pricing include?',
    answer: 'The proposal specifies platform access, delivery responsibilities, infrastructure, execution frequency, maintenance allowances, and service levels. There is no assumed $25K minimum for every managed-service engagement.',
  },
  {
    question: 'How does the first 100 free test cases trial work?',
    answer: 'Bring 100 real qualifying test cases with agreed scope, access, and acceptance criteria. We automate them free so you can inspect the scripts, run the tests, and measure the difference before committing.',
  },
];

