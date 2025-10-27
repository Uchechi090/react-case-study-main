import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import TableSkeleton from './TableSkeleton';

describe('TableSkeleton', () => {
  it('renders 10 skeleton rows', () => {
    const { container } = render(<TableSkeleton />);

    const skeletonRows = container.querySelectorAll('tbody tr');
    expect(skeletonRows).toHaveLength(10);
  });

  it('has accessibility attributes', () => {
    render(<TableSkeleton />);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByLabelText(/loading products/i)).toBeInTheDocument();
  });
});
