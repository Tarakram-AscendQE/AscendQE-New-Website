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
    /*<nav
      className="ml-auto flex w-fit max-w-full items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
      aria-label="Pagination"
    >*/
   /*<nav
  className="flex items-center justify-between w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
  aria-label="Pagination"
>*/
/*<nav
  className="ml-auto flex w-fit max-w-full items-center  ml-auto justify-end px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
  aria-label="Pagination"
>*/
    /*<nav
      className="flex flex-col w-fit max-w-full items-center mx-auto mt-4 px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
      aria-label="Pagination"
    >*/
   <nav
  className="ml-auto flex flex-col w-fit max-w-full items-center px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm"
  aria-label="Pagination"
>


      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          <span aria-hidden="true">←</span> Previous
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={index}
                className="px-1.5 py-1.5 text-xs font-medium text-slate-400"
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
              className={`inline-flex items-center justify-center w-8 h-8 rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
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
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>

      {showingText && (
        <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
          {showingText}
        </span>
      )}
    </nav>
  );
};

export default Pagination;

/*import React from "react";

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
    if (page > 0 && page <= totalPages && page !== currentPage) {
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
    ? `Showing ${startResult} of ${totalResults} results`
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
      className="flex items-center justify-between px-4 py-3 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg"
      aria-label="Blog pagination"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-slate-400 bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span aria-hidden="true">←</span>
        </button>

        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={index} className="px-1.5 py-1.5 text-sm text-slate-500">
                …
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              type="button"
              key={page}
              onClick={() => handleClick(page)}
              aria-current={isActive ? "page" : undefined}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 border border-slate-700 bg-slate-800 hover:bg-slate-700 hover:text-blue-400"
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
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-slate-400 bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      {showingText && (
        <span className="text-xs text-slate-500 whitespace-nowrap">
          {showingText}
        </span>
      )}
    </nav>
  );
};

export default Pagination;*/

/*import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pagination"
    >
      <button
        type="button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="min-h-10 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            type="button"
            key={page}
            onClick={() => handleClick(page)}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`min-h-10 min-w-10 rounded-md border px-3 py-2 text-sm font-medium ${currentPage === page
              ? 'border-blue-600 bg-blue-600 text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'}`}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="min-h-10 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;*/