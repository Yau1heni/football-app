import { StateMessage } from 'components/state-message';
import { type FC } from 'react';
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
  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки клубов" />;
  }

  if (isLoading) {
    return <ClubsListSkeleton />;
  }

  if (clubs.length === 0) {
    return <StateMessage variant="empty" title="Клубы не найдены" />;
  }

  return (
    <div className={styles.clubsList}>
      <div className={styles.list}>
        {clubs.map((club) => (
          <div key={club.id} className={styles.cardWrapper}>
            <ClubCard club={club} />
          </div>
        ))}
      </div>
    </div>
  );
};
