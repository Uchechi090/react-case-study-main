import { useState, useEffect } from "react";

import productsData from "../../data/products.json";
import { useProductsData } from "../../hooks/useProductsData";
import type { Product } from "../../types/product";
import Table from "../../components/table-components/table/Table";
import Pagination from "../../components/pagination/Pagination";
import TableSkeleton from "../../components/skeletons/TableSkeleton";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import CategoryFilter from "../../components/filter-components/CategoryFilter";

const Products = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // All products state and logic in one hook
  const {
    paginatedData,
    categories,
    selectedCategory,
    handleCategoryChange,
    sortColumn,
    sortDirection,
    handleSortChange,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    totalItems,
    handlePageChange,
  } = useProductsData({ products: productsData as Product[] });

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Products
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Manage your product inventory
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading ? (
        <>
          <TableSkeleton />
          <CardSkeleton />
        </>
      ) : (
        <>
          <Table
            products={paginatedData}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSortChange}
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <div
            className="mt-4 text-sm text-gray-600"
            role="status"
            aria-live="polite"
          >
            Showing {startIndex}-{endIndex} of {totalItems} products
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
