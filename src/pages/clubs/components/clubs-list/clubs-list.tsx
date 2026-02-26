import { StateMessage } from 'components/state-message';
import { useFavoritesContext } from 'contexts/favorites';
import { type FC, useCallback } from 'react';
import type { Club } from 'types/clubs.types.ts';

import { ClubCard } from './club-card/club-card.tsx';
import { ClubsListSkeleton } from './clubs-list-skeleton.tsx';
import styles from './clubs-list.module.scss';

type ClubsList = {
  clubs: Club[];
  isLoading: boolean;
  isError: boolean;
};

export const ClubsList: FC<ClubsList> = ({ clubs, isError, isLoading }) => {
  const { favoriteIds, isFavoritesLoading, toggleFavorite, loadingClubId } = useFavoritesContext();

  const handleToggleFavorite = useCallback(
    (clubId: string, isCurrentlyFavorite: boolean) => toggleFavorite(clubId, isCurrentlyFavorite),
    [toggleFavorite]
  );

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки клубов" />;
  }

  if (isLoading || isFavoritesLoading) {
    return <ClubsListSkeleton />;
  }

  if (clubs.length === 0) {
    return <StateMessage variant="empty" title="Клубы не найдены" />;
  }

  return (
    <div className={styles.clubsList}>
      <div className={styles.list}>
        {clubs.map((club) => {
          const isFavorite = favoriteIds.includes(club.id);
          return (
            <ClubCard
              key={club.id}
              club={club}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              isToggleLoading={loadingClubId === club.id}
            />
          );
        })}
      </div>
    </div>
  );
};
