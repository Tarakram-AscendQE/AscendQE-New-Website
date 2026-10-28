export interface NavItem {
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  { label: 'The platform', href: '/' },
  { label: 'How it works', href: '/proof' },
  { label: 'Your options', href: '/pricing' },
  { label: 'Your value', href: '/payoff' },
];

export const footerLinks = {
  internal: [
    { label: 'Technical library & assumptions', href: '/docs' },
    { label: 'Original website reference', href: '/reference' },
  ],
  external: [
    { label: 'Original testimonials', href: 'https://ascendqe.com/testimonials' },
    { label: 'Original website', href: 'https://ascendqe.com' },
  ],
};

