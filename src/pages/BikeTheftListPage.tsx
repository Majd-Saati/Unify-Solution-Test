import { useState } from 'react';
import { BikeCard } from '../components/BikeCard';
import { Pagination } from '../components/Pagination';
import { useStolenBikes, useStolenBikesCount } from '../hooks/useBikes';

const PER_PAGE = 10;

function BikeTheftListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: bikes = [], isLoading, error, refetch } = useStolenBikes({
    distance: 10,
    page: currentPage,
    perPage: PER_PAGE,
  });

  const { data: countData, isLoading: isCountLoading } = useStolenBikesCount({
    distance: 10,
  });

  // Calculate total pages based on count
  const totalCount = countData?.stolen || 0;
  const totalPages = Math.ceil(totalCount / PER_PAGE);
  
  // Calculate showing range
  const startItem = totalCount > 0 ? (currentPage - 1) * PER_PAGE + 1 : 0;
  const endItem = Math.min(currentPage * PER_PAGE, totalCount);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <header className="text-center mb-8 pb-6 border-b-2 border-gray-200">
        <h1 className="text-4xl mb-2 text-gray-900">🚴 Munich Bike Theft Reports</h1>
        <p className="text-lg text-gray-600 m-0">Stolen bikes reported in the Munich area</p>
      </header>

      <main className="w-full">
        {(isLoading || isCountLoading) && (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-lg m-0">Loading stolen bike reports...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 px-8 text-center bg-yellow-50 border border-yellow-400 rounded-lg my-8">
            <p className="text-yellow-800 text-lg mb-4">⚠️ Error: {error instanceof Error ? error.message : 'Failed to load bikes'}</p>
            <button 
              onClick={() => refetch()}
              className="px-6 py-3 bg-indigo-600 text-white border-none rounded-md text-base font-medium cursor-pointer transition-colors hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isCountLoading && !error && (
          <>
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
            
            {bikes.length === 0 ? (
              <div className="text-center py-16 px-8 bg-white rounded-lg shadow-sm">
                <p className="text-xl text-gray-600 m-0">No stolen bikes found in the Munich area.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                  {bikes.map((bike) => (
                    <BikeCard key={bike.id} bike={bike} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default BikeTheftListPage;

