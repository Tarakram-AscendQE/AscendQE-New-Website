import * as React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'navy' | 'highlight' | 'subtle';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-surface-border rounded-2xl p-6 sm:p-8 shadow-sm transition-all duration-200',
      navy: 'bg-navy text-white border border-navy-light rounded-2xl p-6 sm:p-8 shadow-md',
      highlight: 'bg-white border-2 border-blue rounded-2xl p-6 sm:p-8 shadow-md relative',
      subtle: 'bg-surface-subtle border border-surface-border rounded-2xl p-6 sm:p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

