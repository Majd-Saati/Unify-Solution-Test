interface ResultsSummaryProps {
  totalCount: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  totalPages: number;
}

export function ResultsSummary({
  totalCount,
  startItem,
  endItem,
  currentPage,
  totalPages,
}: ResultsSummaryProps) {
  return (
    <div className="text-center text-xl font-semibold text-gray-900 mb-8 py-4 px-4 bg-white rounded-lg shadow-sm">
      {totalCount > 0 ? (
        <>
          Showing {startItem}-{endItem} of {totalCount} stolen {totalCount === 1 ? 'bike' : 'bikes'}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </>
      ) : (
        'No stolen bikes found in the Munich area'
      )}
    </div>
  );
}

