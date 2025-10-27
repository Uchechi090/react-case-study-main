import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CategoryFilter from './CategoryFilter';

describe('CategoryFilter', () => {
  const mockCategories = ['all', 'Electronics', 'Clothing', 'Books'];
  const mockOnChange = vi.fn();

  it('renders with default label and all categories', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Filter by Category')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Clothing' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Books' })).toBeInTheDocument();
  });

  it('displays the currently selected category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Electronics"
        onCategoryChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('Electronics');
  });

  it('calls onCategoryChange when selection changes', async () => {
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnChange}
      />
    );

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Clothing');

    expect(mockOnChange).toHaveBeenCalledWith('Clothing');
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('renders with custom labels when provided', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="all"
        onCategoryChange={mockOnChange}
        label="Choose Category"
        allCategoriesLabel="Show All"
      />
    );

    expect(screen.getByLabelText('Choose Category')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Show All' })).toBeInTheDocument();
  });
});
