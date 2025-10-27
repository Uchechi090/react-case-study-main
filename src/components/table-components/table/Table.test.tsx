import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';

import Table from './Table';
import type { Product } from '../../../types/product';

describe('Table', () => {
  const mockProducts: Product[] = [
    { id: 1, name: 'Product 1', category: 'Electronics', price: 99.99, stock: 10 },
    { id: 2, name: 'Product 2', category: 'Books', price: 19.99, stock: 25 },
  ];

  const mockOnSort = vi.fn();

  it('renders product data', () => {
    render(<Table products={mockProducts} sortColumn={null} sortDirection="asc" onSort={mockOnSort} />);

    const table = screen.getByRole('table', { name: /products table/i });

    expect(within(table).getByText('Product 1')).toBeInTheDocument();
    expect(within(table).getByText('Product 2')).toBeInTheDocument();
    expect(within(table).getByText('Electronics')).toBeInTheDocument();
  });

  it('renders sortable column headers', () => {
    render(<Table products={mockProducts} sortColumn={null} sortDirection="asc" onSort={mockOnSort} />);

    expect(screen.getAllByRole('columnheader')).toHaveLength(4);
  });
});
