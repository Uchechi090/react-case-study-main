import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SortableHeader } from './SortableHeader';
import type { SortDirection } from '../../../hooks/useSort';

interface TestData {
  name: string;
  price: number;
}

describe('SortableHeader', () => {
  const mockOnSort = vi.fn();

  const renderHeader = (currentColumn: keyof TestData | null, direction: SortDirection) => (
    <table>
      <thead>
        <tr>
          <SortableHeader<TestData>
            column="name"
            currentColumn={currentColumn}
            direction={direction}
            onSort={mockOnSort}
          >
            Product Name
          </SortableHeader>
        </tr>
      </thead>
    </table>
  );

  it('renders column header with accessibility attributes', () => {
    render(renderHeader(null, 'asc'));

    const header = screen.getByRole('columnheader');
    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(header).toHaveAttribute('tabindex', '0');
  });

  it('displays correct sort states', () => {
    const { rerender } = render(renderHeader('price', 'asc'));
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'none');

    rerender(renderHeader('name', 'asc'));
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending');

    rerender(renderHeader('name', 'desc'));
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'descending');
  });

  it('calls onSort on interaction', async () => {
    const user = userEvent.setup();
    render(renderHeader(null, 'asc'));

    const header = screen.getByRole('columnheader');

    await user.click(header);
    expect(mockOnSort).toHaveBeenCalledWith('name');

    header.focus();
    await user.keyboard('{Enter}');
    expect(mockOnSort).toHaveBeenCalledWith('name');
  });
});
