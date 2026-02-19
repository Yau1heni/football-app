import { clubsApi } from 'api/clubs-api.ts';
import { StateMessage } from 'components/state-message';
import { useAsync } from 'hooks/use-async';
import { type FC } from 'react';
import type { Club } from 'types/clubs.types.ts';

import { ClubCard } from './club-card/club-card.tsx';
import { ClubsListSkeleton } from './clubs-list-skeleton.tsx';
import styles from './clubs-list.module.scss';

export const ClubsList: FC = () => {
  const { data, isLoading, isError } = useAsync<Club[]>(() => clubsApi.getClubs(), []);

  const clubs = data ?? [];

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
        {clubs.map((club) => {
          return <ClubCard key={club.id} club={club} />;
        })}
      </div>
    </div>
  );
};
