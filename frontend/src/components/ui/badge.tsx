import * as React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'eyebrow' | 'blue' | 'navy' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'eyebrow',
  children,
  ...props
}) => {
  const variants = {
    eyebrow: 'text-[11px] font-bold uppercase tracking-wider text-blue mb-3 inline-block',
    blue: 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-light text-blue',
    navy: 'text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy text-white',
    outline: 'text-xs font-semibold px-2.5 py-0.5 rounded-full border border-surface-border text-ink-muted',
  };

  return (
    <div className={cn(variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

