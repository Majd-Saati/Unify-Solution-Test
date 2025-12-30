import { apiClient } from '../lib/axios';
import type { BikeSearchResponse, BikeCountResponse } from '../types/bike';

export interface FetchBikesParams {
  distance?: number;
  page?: number;
  perPage?: number;
}

/**
 * Fetches stolen bikes from the Munich area
 * @param params - Search parameters
 * @param params.distance - Distance in miles from Munich (default: 10)
 * @param params.page - Page number (default: 1)
 * @param params.perPage - Number of bikes per page (default: 10)
 * @returns Promise with bike search response
 */
export async function fetchStolenBikesFromMunich(
  params: FetchBikesParams = {}
): Promise<BikeSearchResponse> {
  const { distance = 10, page = 1, perPage = 10 } = params;

  // Munich coordinates: 48.1351, 11.5820
  const response = await apiClient.get<BikeSearchResponse>('/search', {
    params: {
      location: '48.1351,11.5820', // Munich coordinates
      stolenness: 'proximity',
      distance: distance.toString(),
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });

  return response.data;
}

/**
 * Fetches the count of stolen bikes from the Munich area
 * @param distance - Distance in miles from Munich (default: 10)
 * @returns Promise with bike count response
 */
export async function fetchStolenBikesCount(
  distance: number = 10
): Promise<BikeCountResponse> {
  const response = await apiClient.get<BikeCountResponse>('/search/count', {
    params: {
      query: 'munich',
      location: 'IP',
      distance: distance.toString(),
      stolenness: 'stolen',
    },
  });

  return response.data;
}

