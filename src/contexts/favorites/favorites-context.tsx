import { useAuthContext } from 'contexts/auth';
import { useFavoritesMutation, useFavoritesQuery } from 'queries/favorites';
import { useCallback, useMemo, type ReactNode } from 'react';
import { createContext, useContext } from 'react';

export type FavoritesContextValue = {
  favoriteIds: string[];
  isFavoritesLoading: boolean;
  toggleFavorite: (clubId: string, isCurrentlyFavorite: boolean) => void;
  isPending: boolean;
  loadingClubId: string | null;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const userId = user?.uid ?? '';
  const { data: favoriteIds, isLoading: isFavoritesLoading } = useFavoritesQuery(userId);

  const { mutate, isPending, variables } = useFavoritesMutation();

  const toggleFavorite = useCallback(
    (clubId: string, isCurrentlyFavorite: boolean) => {
      if (!userId) return;
      mutate({ userId, clubId, isCurrentlyFavorite });
    },
    [userId, mutate]
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds: favoriteIds ?? [],
      isFavoritesLoading,
      toggleFavorite,
      isPending: isPending,
      loadingClubId: isPending ? variables.clubId : null,
    }),
    [favoriteIds, isFavoritesLoading, toggleFavorite, isPending, variables?.clubId]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavoritesContext = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (context === null) {
    throw new Error('useFavoritesContext must be used within FavoritesProvider');
  }
  return context;
};
