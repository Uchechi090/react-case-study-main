import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MobileSortControl } from './MobileSortControl';

describe('MobileSortControl', () => {
  const mockOnSort = vi.fn();

  it('renders sort options', () => {
    render(<MobileSortControl sortColumn={null} sortDirection="asc" onSort={mockOnSort} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /default/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /price/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /stock/i })).toBeInTheDocument();
  });

  it('calls onSort when selecting an option', async () => {
    const user = userEvent.setup();
    render(<MobileSortControl sortColumn={null} sortDirection="asc" onSort={mockOnSort} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'price');

    expect(mockOnSort).toHaveBeenCalledWith('price');
  });

  it('shows direction toggle button when column is selected', () => {
    render(<MobileSortControl sortColumn="price" sortDirection="asc" onSort={mockOnSort} />);

    expect(screen.getByRole('button', { name: /toggle sort direction/i })).toBeInTheDocument();
  });

  it('calls onSort when clicking direction toggle', async () => {
    const user = userEvent.setup();
    render(<MobileSortControl sortColumn="price" sortDirection="asc" onSort={mockOnSort} />);

    const toggleButton = screen.getByRole('button', { name: /toggle sort direction/i });
    await user.click(toggleButton);

    expect(mockOnSort).toHaveBeenCalledWith('price');
  });
});
