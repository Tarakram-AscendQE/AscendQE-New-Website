import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
  resultsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  resultsPerPage = 6,
}) => {
  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const startResult = totalResults
    ? Math.min((currentPage - 1) * resultsPerPage + 1, totalResults)
    : 0;
  const endResult = totalResults
    ? Math.min(currentPage * resultsPerPage, totalResults)
    : 0;

  const showingText = totalResults
    ? `Showing ${startResult}–${endResult} of ${totalResults} results`
    : "";

  const pages: (number | string)[] = [];
  const delta = 2;

  pages.push(1);

  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  if (left > 2) {
    pages.push("...");
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return (
    <nav
      className="ml-auto flex flex-col w-fit max-w-full items-center px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
      aria-label="Pagination"
    >
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 max-w-full">
        <button
          type="button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[36px]"
        >
          <span aria-hidden="true">←</span> Previous
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-1 py-1 text-xs font-medium text-slate-400"
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;
          if (typeof page !== "number") return null;
          return (
            <button
              type="button"
              key={page}
              onClick={() => handleClick(page)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isActive
                  ? "bg-blue-600 text-white border border-blue-600 focus:ring-blue-600/30"
                  : "text-slate-600 border border-transparent bg-transparent hover:bg-slate-100 hover:text-blue-600 focus:ring-blue-600/20"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[36px]"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      {showingText && (
        <span className="text-xs font-medium text-slate-500 text-center mt-2">
          {showingText}
        </span>
      )}
    </nav>
  );
};

export default Pagination;
