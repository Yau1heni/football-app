import { useQuery } from '@tanstack/react-query';
import { favoritesApi } from 'api/favorites-api.ts';

export const FAVORITES_STALE_TIME_MS = 60 * 1000;
export const getFavoritesQueryKeys = (userId: string) => ['favorites', userId];

export const useFavoritesQuery = (userId: string) => {
  return useQuery<string[], Error>({
    queryKey: getFavoritesQueryKeys(userId),
    enabled: !!userId,
    queryFn: () => favoritesApi.getAllIds(userId),
    staleTime: FAVORITES_STALE_TIME_MS,
  });
};
