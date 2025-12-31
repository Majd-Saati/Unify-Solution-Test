import { useStolenBikes } from './useStolenBikes';
import { useStolenBikesCount } from './useStolenBikesCount';
import { ITEMS_PER_PAGE, SEARCH_DISTANCE } from '../constants';
import { calculatePaginationRange } from '../utils/pagination';

export function useBikeTheftData(currentPage: number) {
  const bikesQuery = useStolenBikes({
    distance: SEARCH_DISTANCE,
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
    enabled: true,
  });

  const countQuery = useStolenBikesCount({
    enabled: true,
  });

  const totalCount = countQuery.data?.stolen || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const { startItem, endItem } = calculatePaginationRange(currentPage, ITEMS_PER_PAGE, totalCount);

  const isLoading = bikesQuery.isLoading || countQuery.isLoading;
  const hasError = !!(bikesQuery.error || countQuery.error);
  const errorMessage =
    bikesQuery.error instanceof Error
      ? bikesQuery.error.message
      : countQuery.error instanceof Error
        ? countQuery.error.message
        : 'Failed to load bike theft data';

  const handleRetry = () => {
    bikesQuery.refetch();
    countQuery.refetch();
  };

  return {
    bikes: bikesQuery.data || [],
    totalCount,
    totalPages,
    startItem,
    endItem,
    isLoading,
    hasError,
    errorMessage,
    handleRetry,
    refetch: bikesQuery.refetch,
  };
}

