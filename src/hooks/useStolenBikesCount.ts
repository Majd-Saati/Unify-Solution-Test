import { useQuery } from '@tanstack/react-query';
import { fetchStolenBikesCount } from '../services/bikeApi';
import { BIKE_QUERY_KEYS } from './queryKeys';

export function useStolenBikesCount(options: { enabled?: boolean } = {}) {
  const { enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.count('munich'),
    queryFn: () => fetchStolenBikesCount(),
    enabled,
  });
}

