import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  it('returns paginated data and metadata', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(3);
    expect(result.current.startIndex).toBe(1);
    expect(result.current.endIndex).toBe(10);
    expect(result.current.totalItems).toBe(25);
  });

  it('changes page when setCurrentPage is called', () => {
    const { result } = renderHook(() => usePagination(mockData, 10));

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData).toHaveLength(10);
    expect(result.current.startIndex).toBe(11);
    expect(result.current.endIndex).toBe(20);
  });

  it('resets to page 1 when data changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data, 10),
      { initialProps: { data: mockData } }
    );

    act(() => {
      result.current.setCurrentPage(2);
    });

    expect(result.current.currentPage).toBe(2);

    const newData = mockData.slice(0, 15);
    rerender({ data: newData });

    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(2);
  });
});
