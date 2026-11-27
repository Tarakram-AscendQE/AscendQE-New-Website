interface InsightsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  resultsPerPage: number;
}

function pageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [1];
  const left = Math.max(2, currentPage - 2);
  const right = Math.min(totalPages - 1, currentPage + 2);

  if (left > 2) pages.push('ellipsis');
  for (let page = left; page <= right; page += 1) pages.push(page);
  if (right < totalPages - 1) pages.push('ellipsis');
  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

export function InsightsPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage,
}: InsightsPaginationProps) {
  if (totalPages <= 1) return null;

  const startResult = Math.min((currentPage - 1) * resultsPerPage + 1, totalResults);
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <nav className="ins-pagination" aria-label="Pagination">
      <div className="ins-pagination-controls">
        <button
          type="button"
          className="ins-pagination-step"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">←</span> Previous
        </button>

        {pageNumbers(currentPage, totalPages).map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="ins-pagination-ellipsis" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              type="button"
              key={page}
              className={`ins-pagination-number${page === currentPage ? ' is-current' : ''}`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          className="ins-pagination-step"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
      <span className="ins-pagination-summary">
        Showing {startResult}–{endResult} of {totalResults} results
      </span>
    </nav>
  );
}
