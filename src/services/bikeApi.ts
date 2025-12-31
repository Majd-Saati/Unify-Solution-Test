import { apiClient } from '../lib/axios';
import type { BikeSearchResponse, BikeCountResponse } from '../types/bike';
import { SEARCH_LOCATION, SEARCH_DISTANCE } from '../constants';

export interface FetchBikesParams {
  distance?: number;
  page?: number;
  perPage?: number;
  query?: string;
}

/**
 * Fetches stolen bikes from the Munich area
 * 
 * When no search query is provided:
 * - Uses location-based proximity search with stolenness: "proximity"
 * - Searches within distance miles of Munich
 * 
 * When search query is provided:
 * - Uses full-text search with stolenness: "stolen"
 * - Searches across all stolen bikes (not limited to Munich)
 * 
 * @param params - Search parameters
 * @param params.distance - Distance in miles from Munich (default: 10, only used when no query)
 * @param params.page - Page number (default: 1)
 * @param params.perPage - Number of bikes per page (default: 10)
 * @param params.query - Optional search query for full-text search
 * @returns Promise with bike search response
 */
export async function fetchStolenBikesFromMunich(
  params: FetchBikesParams = {}
): Promise<BikeSearchResponse> {
  const { page = 1, perPage = 10, query, distance = SEARCH_DISTANCE } = params;

  const hasSearchQuery = !!query?.trim();
  
  // Build params based on whether we have a search query
  const requestParams: Record<string, string> = {
    page: page.toString(),
    per_page: perPage.toString(),
  };

  if (hasSearchQuery && query) {
    // Full-text search mode: use query parameter with stolenness: "stolen"
    requestParams.query = query.trim();
    requestParams.stolenness = 'stolen';
  } else {
    // Proximity search mode: use location with stolenness: "proximity"
    requestParams.location = SEARCH_LOCATION;
    requestParams.stolenness = 'proximity';
    requestParams.distance = distance.toString();
  }

  const response = await apiClient.get<BikeSearchResponse>('/search', {
    params: requestParams,
  });

  return response.data;
}

export interface FetchBikesCountParams {
  query?: string;
}

/**
 * Fetches the count of stolen bikes from the Munich area
 * 
 * When no search query is provided:
 * - Uses location-based proximity search with stolenness: "proximity"
 * 
 * When search query is provided:
 * - Uses full-text search with stolenness: "stolen"
 * 
 * @param params - Optional parameters
 * @param params.query - Optional search query for full-text search
 * @returns Promise with bike count response
 */
export async function fetchStolenBikesCount(
  params: FetchBikesCountParams = {}
): Promise<BikeCountResponse> {
  const { query } = params;
  const hasSearchQuery = !!query?.trim();
  
  // Build params based on whether we have a search query
  const requestParams: Record<string, string> = {};

  if (hasSearchQuery && query) {
    // Full-text search mode: use query parameter with stolenness: "stolen"
    requestParams.query = query.trim();
    requestParams.stolenness = 'stolen';
  } else {
    // Proximity search mode: use location with stolenness: "proximity"
    requestParams.location = SEARCH_LOCATION;
    requestParams.stolenness = 'proximity';
    requestParams.distance = SEARCH_DISTANCE.toString();
  }

  const response = await apiClient.get<BikeCountResponse>('/search/count', {
    params: requestParams,
  });

  return response.data;
}

