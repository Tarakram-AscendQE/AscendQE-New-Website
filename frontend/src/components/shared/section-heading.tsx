import React from 'react';
import { Badge } from '../ui/badge';
import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}) => {
  return (
    <div className={cn('mb-10 sm:mb-14', centered && 'text-center mx-auto max-w-3xl', className)}>
      {eyebrow && <Badge variant="eyebrow">{eyebrow}</Badge>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed max-w-2xl text-balance">
          {subtitle}
        </p>
      )}
    </div>
  );
};

