import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { name: /productsup/i })).toBeInTheDocument();
  });

  it('renders notification button', () => {
    render(<Header />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders user avatar with initials', () => {
    render(<Header />);

    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});
