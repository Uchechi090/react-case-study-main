import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  const mockOnNavigate = vi.fn();

  it('renders navigation items', () => {
    render(<Sidebar currentPage="products" onNavigate={mockOnNavigate} />);

    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about case study/i })).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(<Sidebar currentPage="products" onNavigate={mockOnNavigate} />);

    const productsButton = screen.getByRole('button', { name: /products/i });
    const aboutButton = screen.getByRole('button', { name: /about case study/i });

    expect(productsButton).toHaveClass('bg-blue-600');
    expect(aboutButton).not.toHaveClass('bg-blue-600');
  });

  it('calls onNavigate when clicking navigation item', async () => {
    const user = userEvent.setup();
    render(<Sidebar currentPage="products" onNavigate={mockOnNavigate} />);

    const aboutButton = screen.getByRole('button', { name: /about case study/i });
    await user.click(aboutButton);

    expect(mockOnNavigate).toHaveBeenCalledWith('about');
  });
});
