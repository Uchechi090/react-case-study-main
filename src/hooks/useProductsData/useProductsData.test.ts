import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useProductsData } from './useProductsData';
import type { Product } from '../../types/product';

// Mock the URL state hooks
vi.mock('../useUrlState', () => ({
  useUrlState: vi.fn((_key, defaultValue) => {
    const state = vi.fn(() => defaultValue);
    const setState = vi.fn();
    return [state(), setState];
  }),
  useUrlNumberState: vi.fn((_key, defaultValue) => {
    const state = vi.fn(() => defaultValue);
    const setState = vi.fn();
    return [state(), setState];
  }),
}));

describe('useProductsData', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99, stock: 10 },
    { id: 2, name: 'Product 2', category: 'Books', price: 19.99, stock: 25 },
    { id: 3, name: 'Product 3', category: 'Electronics', price: 149.99, stock: 5 },
    { id: 4, name: 'Product 4', category: 'Clothing', price: 29.99, stock: 50 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('extracts unique categories', () => {
    const { result } = renderHook(() => useProductsData({ products: mockProducts }));

    expect(result.current.categories).toEqual(['all', 'Electronics', 'Books', 'Clothing']);
  });

  it('returns paginated data', () => {
    const { result } = renderHook(() => useProductsData({ products: mockProducts }));

    expect(result.current.paginatedData).toHaveLength(4);
    expect(result.current.totalItems).toBe(4);
  });

  it('provides callback handlers', () => {
    const { result } = renderHook(() => useProductsData({ products: mockProducts }));

    expect(typeof result.current.handleCategoryChange).toBe('function');
    expect(typeof result.current.handleSortChange).toBe('function');
    expect(typeof result.current.handlePageChange).toBe('function');
  });
});
