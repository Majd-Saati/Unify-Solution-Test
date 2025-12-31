export const BIKE_QUERY_KEYS = {
  all: ['bikes'] as const,
  stolen: (location: string, distance: number, page: number, perPage: number) =>
    ['bikes', 'stolen', location, distance, page, perPage] as const,
  count: (location: string) => ['bikes', 'count', location] as const,
} as const;

