import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchStolenBikesFromMunich, fetchStolenBikesCount } from '../services/bikeApi';
import type { Bike } from '../types/bike';

export const BIKE_QUERY_KEYS = {
  all: ['bikes'] as const,
  stolen: (location: string, distance: number, page: number, perPage: number) =>
    ['bikes', 'stolen', location, distance, page, perPage] as const,
  count: (location: string, distance: number) =>
    ['bikes', 'count', location, distance] as const,
} as const;

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
      // Filter to only show stolen bikes (not found bikes)
      return response.bikes.filter(
        (bike): bike is Bike => bike.stolen && bike.status === 'stolen'
      );
    },
    enabled,
    placeholderData: keepPreviousData, // Keep previous data while fetching new page
  });
}

export function useStolenBikesCount(options: { distance?: number; enabled?: boolean } = {}) {
  const { distance = 10, enabled = true } = options;

  return useQuery({
    queryKey: BIKE_QUERY_KEYS.count('munich', distance),
    queryFn: () => fetchStolenBikesCount(distance),
    enabled,
  });
}

