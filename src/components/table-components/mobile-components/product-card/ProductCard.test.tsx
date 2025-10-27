import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ProductCard } from './ProductCard';
import type { Product } from '../../../../types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    category: 'Electronics',
    price: 99.99,
    stock: 50,
  };

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole('heading', { name: 'Test Product' })).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('50 units')).toBeInTheDocument();
  });
});
