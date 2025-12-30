export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-lg m-0">Loading...</p>
    </div>
  );
}

