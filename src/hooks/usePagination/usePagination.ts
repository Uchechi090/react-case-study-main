import { useState, useEffect, useMemo, useCallback } from 'react';

export interface UsePaginationReturn<T> {
  paginatedData: T[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
}

/**
 * Custom hook for client-side pagination
 * Automatically resets to page 1 when data changes
 * @param data - Array of items to paginate
 * @param itemsPerPage - Number of items per page (default: 10)
 * @returns Pagination state and controls
 */
export const usePagination = <T,>(
  data: T[],
  itemsPerPage = 10
): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Reset to page 1 when data changes (filters, sorting)
  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const { paginatedData, startIndex, endIndex } = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      paginatedData: data.slice(start, end),
      startIndex: data.length > 0 ? start + 1 : 0,
      endIndex: Math.min(end, data.length),
    };
  }, [data, currentPage, itemsPerPage]);

  // Memoize setCurrentPage to ensure stable reference
  const memoizedSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    paginatedData,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems: data.length,
    setCurrentPage: memoizedSetCurrentPage,
  };
};
