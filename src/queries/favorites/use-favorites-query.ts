import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { favoritesApi } from 'api/favorites-api.ts';

import { getFavoritesQueryKeys } from './keys.ts';

export const useFavoritesQuery = (userId: string) => {
  return useQuery<string[], Error>({
    queryKey: getFavoritesQueryKeys(userId),
    enabled: !!userId,
    queryFn: () => favoritesApi.getAllIds(userId),
    staleTime: STALE_TIME_MS,
  });
};
