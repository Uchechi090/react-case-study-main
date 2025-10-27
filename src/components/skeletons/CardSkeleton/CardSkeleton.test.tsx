import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import CardSkeleton from './CardSkeleton';

describe('CardSkeleton', () => {
  it('renders 10 skeleton cards', () => {
    const { container } = render(<CardSkeleton />);

    const skeletonCards = container.querySelectorAll('.animate-pulse');
    expect(skeletonCards).toHaveLength(10);
  });

  it('has accessibility attributes', () => {
    render(<CardSkeleton />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText(/loading products/i)).toBeInTheDocument();
  });
});
