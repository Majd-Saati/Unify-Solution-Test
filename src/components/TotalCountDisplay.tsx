import { FaBicycle } from 'react-icons/fa';

interface TotalCountDisplayProps {
  totalCount: number;
  isLoading?: boolean;
  searchQuery?: string;
}

export function TotalCountDisplay({ totalCount, isLoading = false, searchQuery }: TotalCountDisplayProps) {
  const hasSearchQuery = !!searchQuery?.trim();

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 bg-amber-200 rounded-full animate-pulse" />
          <div className="h-6 w-32 bg-amber-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-center gap-3">
        <div className="bg-amber-500 rounded-full p-3">
          <FaBicycle className="w-6 h-6 text-white" />
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {totalCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600 font-medium">
            {hasSearchQuery ? (
              <>Stolen bikes matching "{searchQuery}"</>
            ) : (
              <>Stolen bikes in Munich area</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

