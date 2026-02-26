import { useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from 'api/favorites-api.ts';

import { getFavoritesQueryKeys } from './use-favorites-query.ts';

type ToggleFavoriteParams = {
  userId: string;
  clubId: string;
  isCurrentlyFavorite: boolean;
};

export const useFavoritesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, clubId, isCurrentlyFavorite }: ToggleFavoriteParams) => {
      if (isCurrentlyFavorite) {
        await favoritesApi.removeFavorite(userId, clubId);
      } else {
        await favoritesApi.addFavorite(userId, clubId);
      }
      await queryClient.refetchQueries({
        queryKey: getFavoritesQueryKeys(userId),
      });
    },
  });
};
