import { useState, useMemo } from 'react';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  column: keyof T | null;
  direction: SortDirection;
}

export interface UseSortReturn<T> {
  sortedData: T[];
  sortColumn: keyof T | null;
  sortDirection: SortDirection;
  handleSort: (column: keyof T) => void;
}

/**
 * Custom hook for sorting data by column with direction toggle
 * @param data - Array of objects to sort
 * @param initialColumn - Initial column to sort by
 * @param initialDirection - Initial sort direction ('asc' or 'desc')
 * @returns Sorted data and sort controls
 */
export const useSort = <T extends Record<string, any>>(
  data: T[],
  initialColumn: keyof T | null = null,
  initialDirection: SortDirection = 'asc'
): UseSortReturn<T> => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    column: initialColumn,
    direction: initialDirection,
  });

  const handleSort = (column: keyof T) => {
    setSortConfig((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column!];
      const bValue = b[sortConfig.column!];

      // Handle null/undefined values
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Normalize strings for case-insensitive comparison
      const compareA = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
      const compareB = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

      if (compareA < compareB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (compareA > compareB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return {
    sortedData,
    sortColumn: sortConfig.column,
    sortDirection: sortConfig.direction,
    handleSort,
  };
};
