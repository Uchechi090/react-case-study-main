import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import type { Product } from "../../../../types/product";
import type { SortDirection } from "../../../../hooks/useSort";

interface MobileSortControlProps {
  sortColumn: keyof Product | null;
  sortDirection: SortDirection;
  onSort: (column: keyof Product) => void;
}

const sortOptions: { value: keyof Product; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
  { value: "price", label: "Price" },
  { value: "stock", label: "Stock" },
];

export const MobileSortControl = ({
  sortColumn,
  sortDirection,
  onSort,
}: MobileSortControlProps) => {
  const handleChange = (value: string) => {
    onSort(value as keyof Product);
  };

  const handleToggleDirection = () => {
    if (sortColumn) {
      onSort(sortColumn);
    }
  };

  return (
    <div className="flex items-center gap-3 mb-4 md:hidden">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <ArrowUpDown size={16} />
        <span className="font-medium">Sort by:</span>
      </div>
      <div className="flex-1 flex items-center gap-2">
        <select
          value={sortColumn || ""}
          onChange={(e) => handleChange(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
        >
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {sortColumn && (
          <button
            onClick={handleToggleDirection}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] bg-blue-50 border border-blue-200 rounded-lg flex-shrink-0 active:bg-blue-100 transition-colors"
            aria-label={`Toggle sort direction (currently ${
              sortDirection === "asc" ? "ascending" : "descending"
            })`}
          >
            {sortDirection === "asc" ? (
              <ArrowUp size={20} className="text-blue-600" />
            ) : (
              <ArrowDown size={20} className="text-blue-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
