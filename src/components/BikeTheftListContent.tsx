import type { Bike } from '../types/bike';
import { BikeCard } from './BikeCard';
import { BikeCardSkeletonList } from './BikeCardSkeletonList';
import { ErrorDisplay } from './ErrorDisplay';
import { EmptyState } from './EmptyState';
import { ResultsSummary } from './ResultsSummary';
import { Pagination } from './Pagination';
import type { DataState } from '../utils/stateHandler';
import { SKELETON_COUNT } from '../constants';

interface BikeTheftListContentProps {
  state: DataState;
  bikes: Bike[];
  totalCount: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  searchQuery: string;
  errorMessage: string;
  isLoading: boolean;
  onRetry: () => void;
  onPageChange: (page: number) => void;
}

export function BikeTheftListContent({
  state,
  bikes,
  totalCount,
  totalPages,
  startItem,
  endItem,
  currentPage,
  searchQuery,
  errorMessage,
  isLoading,
  onRetry,
  onPageChange,
}: BikeTheftListContentProps) {
  switch (state) {
    case 'loading':
      return <LoadingState />;

    case 'error':
      return <ErrorState message={errorMessage} onRetry={onRetry} />;

    case 'empty':
      return <EmptyStateView searchQuery={searchQuery} />;

    case 'success':
      return (
        <SuccessState
          bikes={bikes}
          totalCount={totalCount}
          totalPages={totalPages}
          startItem={startItem}
          endItem={endItem}
          currentPage={currentPage}
          searchQuery={searchQuery}
          isLoading={isLoading}
          onPageChange={onPageChange}
        />
      );

    default:
      return <LoadingState />;
  }
}

function LoadingState() {
  return <BikeCardSkeletonList count={SKELETON_COUNT} />;
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return <ErrorDisplay message={message} onRetry={onRetry} />;
}

interface EmptyStateViewProps {
  searchQuery: string;
}

function EmptyStateView({ searchQuery }: EmptyStateViewProps) {
  return <EmptyState searchQuery={searchQuery} />;
}

interface SuccessStateProps {
  bikes: Bike[];
  totalCount: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  currentPage: number;
  searchQuery: string;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

function SuccessState({
  bikes,
  totalCount,
  totalPages,
  startItem,
  endItem,
  currentPage,
  searchQuery,
  isLoading,
  onPageChange,
}: SuccessStateProps) {
  const hasBikes = bikes.length > 0;

  return (
    <>
      <ResultsSummary
        totalCount={totalCount}
        startItem={startItem}
        endItem={endItem}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />
      {hasBikes ? (
        <>
          <BikeList bikes={bikes} />
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              isLoading={isLoading}
            />
          )}
        </>
      ) : (
        <EmptyState searchQuery={searchQuery} />
      )}
    </>
  );
}

interface BikeListProps {
  bikes: Bike[];
}

function BikeList({ bikes }: BikeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}

