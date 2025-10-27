import type { Product } from "../../../types/product";
import type { SortDirection } from "../../../hooks/useSort";
import { SortableHeader } from "../sortable-header/SortableHeader";
import { ProductCard } from "../mobile-components/product-card/ProductCard";
import { MobileSortControl } from "../mobile-components/mobile-sort-control";

interface TableProps {
  products: Product[];
  sortColumn: keyof Product | null;
  sortDirection: SortDirection;
  onSort: (column: keyof Product) => void;
}

const Table = ({ products, sortColumn, sortDirection, onSort }: TableProps) => {
  return (
    <>
      {/* Mobile Sort Control - visible only on mobile */}
      <MobileSortControl
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={onSort}
      />

      {/* Table View - hidden on mobile, visible on tablet/desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-label="Products table">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr role="row">
                <SortableHeader
                  column="name"
                  currentColumn={sortColumn}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Product Name
                </SortableHeader>
                <SortableHeader
                  column="category"
                  currentColumn={sortColumn}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Category
                </SortableHeader>
                <SortableHeader
                  column="price"
                  currentColumn={sortColumn}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Price
                </SortableHeader>
                <SortableHeader
                  column="stock"
                  currentColumn={sortColumn}
                  direction={sortDirection}
                  onSort={onSort}
                >
                  Stock
                </SortableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                    <div className="text-xs md:text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                    <span className="px-2 md:px-2.5 lg:px-3 py-0.5 md:py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                    <div className="text-xs md:text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                    <div className="text-xs md:text-sm text-gray-900">
                      {product.stock} units
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View - visible only on mobile */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Table;
