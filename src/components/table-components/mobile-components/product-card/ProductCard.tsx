import type { Product } from "../../../../types/product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900 break-words">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-500 flex-shrink-0">Category</span>
          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 whitespace-nowrap">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-gray-500 flex-shrink-0">Price</span>
          <span className="text-base font-bold text-gray-900 whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex-shrink-0">Stock</span>
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {product.stock} units
          </span>
        </div>
      </div>
    </div>
  );
};
