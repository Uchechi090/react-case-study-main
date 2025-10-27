import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

import type { SortDirection } from "../../../hooks/useSort";

interface SortableHeaderProps<T> {
  column: keyof T;
  currentColumn: keyof T | null;
  direction: SortDirection;
  onSort: (column: keyof T) => void;
  children: React.ReactNode;
}

export const SortableHeader = <T,>({
  column,
  currentColumn,
  direction,
  onSort,
  children,
}: SortableHeaderProps<T>) => {
  const isActive = currentColumn === column;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort(column);
    }
  };

  const getSortState = () => {
    if (!isActive) return "none";
    return direction === "asc" ? "ascending" : "descending";
  };

  const getAriaLabel = () => {
    const columnName = String(column);
    if (!isActive) {
      return `${columnName}: sortable column, click to sort`;
    }
    return `${columnName}: sorted ${
      direction === "asc" ? "ascending" : "descending"
    }, click to reverse`;
  };

  return (
    <th
      className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      onClick={() => onSort(column)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="columnheader"
      aria-sort={getSortState()}
      aria-label={getAriaLabel()}
    >
      <div className="flex items-center gap-2">
        {children}
        {isActive ? (
          direction === "asc" ? (
            <ArrowUp size={16} className="text-gray-700" aria-hidden="true" />
          ) : (
            <ArrowDown size={16} className="text-gray-700" aria-hidden="true" />
          )
        ) : (
          <ArrowUpDown size={16} className="text-gray-400" aria-hidden="true" />
        )}
      </div>
    </th>
  );
};
