import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useSort } from './useSort';

interface TestData {
  id: number;
  name: string;
  price: number;
}

describe('useSort', () => {
  const mockData: TestData[] = [
    { id: 1, name: 'Zebra', price: 100 },
    { id: 2, name: 'Apple', price: 50 },
    { id: 3, name: 'Mango', price: 75 },
  ];

  it('returns unsorted data when no column is selected', () => {
    const { result } = renderHook(() => useSort(mockData));

    expect(result.current.sortedData).toEqual(mockData);
    expect(result.current.sortColumn).toBeNull();
    expect(result.current.sortDirection).toBe('asc');
  });

  it('sorts data ascending when column is selected', () => {
    const { result } = renderHook(() => useSort(mockData));

    act(() => {
      result.current.handleSort('name');
    });

    expect(result.current.sortedData[0].name).toBe('Apple');
    expect(result.current.sortedData[2].name).toBe('Zebra');
    expect(result.current.sortDirection).toBe('asc');
  });

  it('toggles to descending when same column is clicked', () => {
    const { result } = renderHook(() => useSort(mockData));

    act(() => {
      result.current.handleSort('price');
    });

    expect(result.current.sortDirection).toBe('asc');

    act(() => {
      result.current.handleSort('price');
    });

    expect(result.current.sortDirection).toBe('desc');
    expect(result.current.sortedData[0].price).toBe(100);
    expect(result.current.sortedData[2].price).toBe(50);
  });
});
