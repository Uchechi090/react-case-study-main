import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  it('renders pagination buttons and highlights current page', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 5/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /current page, page 3/i })).toHaveAttribute('aria-current', 'page');
  });

  it('disables navigation buttons at boundaries', () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();

    rerender(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);

    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  it('calls onPageChange when clicking navigation', async () => {
    const user = userEvent.setup();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={mockOnPageChange} />);

    await user.click(screen.getByRole('button', { name: /page 1/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
