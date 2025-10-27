import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // On mobile, show limited page numbers to prevent overflow
  const getVisiblePages = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) return pages;

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return pages.slice(start - 1, end);
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-white p-4 rounded-lg border border-gray-200 md:bg-transparent md:border-0 md:p-0"
      role="navigation"
      aria-label="Pagination navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 min-h-[44px] md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to previous page"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-center" role="list">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[44px] min-h-[44px] md:px-4 md:py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={`${currentPage === page ? 'Current page, ' : ''}Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 min-h-[44px] md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Go to next page"
      >
        <span>Next</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default Pagination;
