/**
 * CardSkeleton Component
 * Loading placeholder for product cards on mobile view
 * Shows shimmer animation while data is being loaded
 */

const CardSkeleton = () => {
  // Generate 10 skeleton cards to match pagination size
  const skeletonCards = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="md:hidden grid grid-cols-1 gap-4" role="status" aria-label="Loading products">
      {skeletonCards.map((index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm animate-pulse"
        >
          <div className="space-y-3">
            {/* Product name */}
            <div className="h-5 bg-gray-200 rounded w-3/4"></div>

            {/* Category */}
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>

            {/* Stock */}
            <div className="flex items-center justify-between gap-2">
              <div className="h-4 bg-gray-200 rounded w-12"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
