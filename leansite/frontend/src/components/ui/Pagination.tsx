import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

/** Page numbers to show: first, last, and the current page ± 1, with gaps as null. */
function pageList(page: number, totalPages: number): (number | null)[] {
  const pages: (number | null)[] = [];
  for (let n = 1; n <= totalPages; n++) {
    if (n === 1 || n === totalPages || Math.abs(n - page) <= 1) pages.push(n);
    else if (pages[pages.length - 1] !== null) pages.push(null);
  }
  return pages;
}

/** Previous / numbered / next page buttons. Renders nothing for a single page. */
export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <nav className={cn('pager', className)} aria-label="Pagination">
      <button type="button" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
        <ChevronLeft aria-hidden="true" />
      </button>
      {pageList(page, totalPages).map((n, index) =>
        n === null ? (
          <span key={`gap-${index}`} className="pager-gap" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-current={n === page ? 'page' : undefined}
            aria-label={`Page ${n}`}
          >
            {n}
          </button>
        )
      )}
      <button type="button" onClick={() => onChange(page + 1)} disabled={page >= totalPages} aria-label="Next page">
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
