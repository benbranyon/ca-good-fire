export function FireRiskMapLoading() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="text-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Loading Fire Risk Map
        </h3>
        <p className="text-gray-600">
          Initializing California fire hazard data...
        </p>
      </div>
    </div>
  );
} 