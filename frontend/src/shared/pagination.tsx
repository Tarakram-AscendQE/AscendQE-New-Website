import React, { useEffect, useState } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
  const delta = isMobile ? (totalPages <= 5 ? 2 : 0) : 2;

  pages.push(1);

  let left = Math.max(2, currentPage - delta);
  let right = Math.min(totalPages - 1, currentPage + delta);

  // Ensure mobile edge pages still show an adjacent page
  if (isMobile && totalPages > 5) {
    if (currentPage <= 2) right = Math.min(totalPages - 1, 2);
    if (currentPage >= totalPages - 1) left = Math.max(2, totalPages - 1);
  }

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
      className="mx-auto sm:ml-auto sm:mr-0 flex flex-col w-fit max-w-full items-center px-2.5 py-2 sm:px-4 sm:py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
      aria-label="Pagination"
    >
      <div className="flex flex-nowrap items-center justify-center gap-0.5 min-[380px]:gap-1 sm:gap-2 max-w-full overflow-x-auto">
        <button
          type="button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[32px] sm:min-h-[36px] whitespace-nowrap shrink-0"
        >
          <span aria-hidden="true">←</span>
          <span className="hidden min-[380px]:inline">Previous</span>
          <span className="min-[380px]:hidden">Prev</span>
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-0.5 sm:px-1 py-1 text-xs font-medium text-slate-400 shrink-0"
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
              className={`inline-flex items-center justify-center min-w-[26px] h-7 min-[380px]:min-w-[28px] sm:min-w-[32px] sm:h-8 px-1 sm:px-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 shrink-0 ${
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
          aria-label="Next page"
          className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[32px] sm:min-h-[36px] whitespace-nowrap shrink-0"
        >
          <span>Next</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {showingText && (
        <span className="text-[11px] sm:text-xs font-medium text-slate-500 text-center mt-2">
          {showingText}
        </span>
      )}
    </nav>
  );
};

export default Pagination;
