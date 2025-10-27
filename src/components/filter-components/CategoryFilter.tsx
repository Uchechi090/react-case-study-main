/**
 * CategoryFilter Component
 * Reusable dropdown for filtering items by category
 *
 * Features:
 * - Responsive design (full-width on mobile, auto on desktop)
 * - Touch-friendly tap targets on mobile
 * - Accessible with proper ARIA labels
 * - Generic enough for reuse with any category-based filtering
 */

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  label?: string;
  allCategoriesLabel?: string;
}

const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  label = "Filter by Category",
  allCategoriesLabel = "All Categories",
}: CategoryFilterProps) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="category-filter"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="w-full md:w-auto px-4 py-3 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
        aria-label={label}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? allCategoriesLabel : category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
