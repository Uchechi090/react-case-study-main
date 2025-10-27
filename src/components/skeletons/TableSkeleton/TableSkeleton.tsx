/**
 * TableSkeleton Component
 * Loading placeholder for the products table on desktop/tablet views
 * Shows shimmer animation while data is being loaded
 */

const TableSkeleton = () => {
  // Generate 10 skeleton rows to match pagination size
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="Loading products">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </th>
              <th className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </th>
              <th className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </th>
              <th className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {skeletonRows.map((index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </td>
                <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </td>
                <td className="px-3 md:px-2 lg:px-6 py-2 md:py-2 lg:py-4 whitespace-nowrap">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
