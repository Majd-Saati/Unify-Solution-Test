import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchStolenBikesFromMunich } from '../services/bikeApi';
import type { Bike } from '../types/bike';
import { BIKE_QUERY_KEYS } from './queryKeys';

interface UseStolenBikesOptions {
  distance?: number;
  page?: number;
  perPage?: number;
  enabled?: boolean;
}

export function useStolenBikes(options: UseStolenBikesOptions = {}) {
  const { distance = 10, page = 1, perPage = 10, enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.stolen('munich', distance, page, perPage),
    queryFn: async () => {
      const response = await fetchStolenBikesFromMunich({
        distance,
        page,
        perPage,
      });
      return response.bikes.filter(
        (bike): bike is Bike => bike.stolen && bike.status === 'stolen'
      );
    },
    enabled,
    placeholderData: keepPreviousData,
  });
}

