import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

import Products from './Products';

// Mock the useProductsData hook
vi.mock('../../hooks/useProductsData', () => ({
  useProductsData: vi.fn(() => ({
    paginatedData: [
      { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99, stock: 10 },
      { id: 2, name: 'Product 2', category: 'Books', price: 19.99, stock: 25 },
    ],
    categories: ['all', 'Electronics', 'Books'],
    selectedCategory: 'all',
    handleCategoryChange: vi.fn(),
    sortColumn: null,
    sortDirection: 'asc' as const,
    handleSortChange: vi.fn(),
    currentPage: 1,
    totalPages: 2,
    startIndex: 1,
    endIndex: 2,
    totalItems: 15,
    handlePageChange: vi.fn(),
  })),
}));

describe('Products', () => {
  it('shows loading skeletons initially', () => {
    render(<Products />);

    expect(screen.getByRole('table', { name: /loading products/i })).toBeInTheDocument();
  });

  it('renders products table after loading', async () => {
    render(<Products />);

    await waitFor(
      () => {
        expect(screen.getByRole('table', { name: /products table/i })).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it('displays product count info', async () => {
    render(<Products />);

    await waitFor(
      () => {
        expect(screen.getByText(/showing 1-2 of 15 products/i)).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
