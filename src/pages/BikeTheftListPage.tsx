import { SearchInput } from '../components/SearchInput';
import { BikeTheftListContent } from '../components/BikeTheftListContent';
import { TotalCountDisplay } from '../components/TotalCountDisplay';
import { useBikeTheftData } from '../hooks/useBikeTheftData';
import { useSearchFilters } from '../hooks/useSearchFilters';
import { getDataState } from '../utils/stateHandler';

function BikeTheftListPage() {
  const { filters, setQuery, setPage } = useSearchFilters();
  const { query, page: currentPage } = filters;
  
  const {
    bikes,
    totalCount,
    totalPages,
    startItem,
    endItem,
    isLoading,
    hasError,
    errorMessage,
    handleRetry,
  } = useBikeTheftData({ currentPage, query });

  const hasBikes = bikes.length > 0;
  const dataState = getDataState({
    isLoading,
    hasError: !!hasError,
    hasData: hasBikes,
    totalCount,
  });

  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <PageHeader />
      <SearchSection query={query} onQueryChange={setQuery} isLoading={isLoading} />
      <TotalCountDisplay 
        totalCount={totalCount} 
        isLoading={isLoading}
        searchQuery={query}
      />
      <main className="w-full">
        <BikeTheftListContent
          state={dataState}
          bikes={bikes}
          totalCount={totalCount}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          currentPage={currentPage}
          searchQuery={query}
          errorMessage={errorMessage}
          isLoading={isLoading}
          onRetry={handleRetry}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="text-center mb-6 pb-6 border-b-2 border-gray-200">
      <h1 className="text-4xl mb-2 text-gray-900">🚴 Munich Bike Theft Reports</h1>
      <p className="text-lg text-gray-600 m-0">Stolen bikes reported in the Munich area</p>
    </header>
  );
}

interface SearchSectionProps {
  query: string;
  onQueryChange: (query: string) => void;
  isLoading: boolean;
}

function SearchSection({ query, onQueryChange, isLoading }: SearchSectionProps) {
  return (
    <section className="mb-8 flex justify-center">
      <SearchInput
        value={query}
        onChange={onQueryChange}
        placeholder="Search by case title (e.g., 'Canyon', 'BMX', 'Electric')..."
        isLoading={isLoading}
      />
    </section>
  );
}

export default BikeTheftListPage;

