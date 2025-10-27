/**
 * useProductsData Hook
 * Handles products data transformation: filtering, sorting, and pagination
 * Syncs state with URL for shareable/bookmarkable views
 *
 * This hook encapsulates all the complex logic of managing product state,
 * keeping the Products component clean and focused on rendering.
 */

import { useMemo, useCallback, useEffect } from 'react';
import { useSort } from '../useSort';
import { usePagination } from '../usePagination';
import { useUrlState, useUrlNumberState } from '../useUrlState';
import type { Product } from '../../types/product';
import type { SortDirection } from '../useSort';

interface UseProductsDataProps {
  products: Product[];
}

export const useProductsData = ({ products }: UseProductsDataProps) => {
  // URL-synced state
  const [selectedCategory, setSelectedCategory] = useUrlState<string>("category", "all");
  const [urlSortColumn, setUrlSortColumn] = useUrlState<string>("sortBy", "");
  const [urlSortDirection, setUrlSortDirection] = useUrlState<SortDirection>("order", "asc");
  const [urlPage, setUrlPage] = useUrlNumberState("page", 1);

  // Extract unique categories
  const categories = useMemo(() => [
    "all",
    ...new Set(products.map((p) => p.category)),
  ], [products]);

  // Filter products by category
  const filteredProducts = useMemo(() =>
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory),
    [products, selectedCategory]
  );

  // Sort filtered products
  const initialSortColumn = urlSortColumn ? (urlSortColumn as keyof Product) : null;
  const { sortedData, sortColumn, sortDirection, handleSort } =
    useSort<Product>(filteredProducts, initialSortColumn, urlSortDirection);

  // Paginate sorted products
  const {
    paginatedData,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    setCurrentPage,
  } = usePagination(sortedData, 10);

  // Sync URL with sort state
  useEffect(() => {
    if (sortColumn) {
      setUrlSortColumn(String(sortColumn));
      setUrlSortDirection(sortDirection);
    } else {
      setUrlSortColumn("");
    }
  }, [sortColumn, sortDirection, setUrlSortColumn, setUrlSortDirection]);

  // Sync URL with page state
  useEffect(() => {
    if (currentPage !== urlPage) {
      setUrlPage(currentPage);
    }
  }, [currentPage, urlPage, setUrlPage]);

  // Initialize page from URL on mount
  useEffect(() => {
    if (urlPage > 0 && urlPage <= totalPages && urlPage !== currentPage) {
      setCurrentPage(urlPage);
    }
  }, []); // Only run on mount

  // Memoized callbacks
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  const handleSortChange = useCallback((column: keyof Product) => {
    handleSort(column);
  }, [handleSort]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  return {
    // Data
    paginatedData,
    categories,

    // Filter state
    selectedCategory,
    handleCategoryChange,

    // Sort state
    sortColumn,
    sortDirection,
    handleSortChange,

    // Pagination state
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handlePageChange,
  };
};
