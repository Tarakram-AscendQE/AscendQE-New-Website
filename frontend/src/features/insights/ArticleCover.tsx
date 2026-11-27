import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ArticleCoverProps {
  src: string | null;
  alt: string;
  className?: string;
  /** Lazy-load below-the-fold covers (cards); the article hero loads eagerly. */
  lazy?: boolean;
}

/** Article cover image; without one (or if it fails to load) shows the bracketed-A mark on the ink band. */
export function ArticleCover({ src, alt, className, lazy = true }: ArticleCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = Boolean(src) && failedSrc !== src;

  return (
    <div className={cn('ins-cover', !showImage && 'ins-cover--empty', className)}>
      {showImage && src ? (
        <img src={src} alt={alt} loading={lazy ? 'lazy' : 'eager'} decoding="async" onError={() => setFailedSrc(src)} />
      ) : (
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <path d="M3 6H16V13.5H11.5V50.5H16V58H3Z" />
          <path d="M61 6H48V13.5H52.5V50.5H48V58H61Z" />
          <path className="a" d="M18 54 32 10 46 54H39L32 32 25 54ZM29.77 39H34.23L35.82 44H28.18Z" />
        </svg>
      )}
    </div>
  );
}
