import { ClubLogo } from 'components/club-logo';
import { PageTitle } from 'components/page-title';
import { StateMessage } from 'components/state-message';
import { Button } from 'components/ui/button';
import { useFavoritesContext } from 'contexts/favorites';
import { usePageMeta } from 'hooks/use-page-meta.ts';
import { useClubQuery } from 'queries/club';
import type { FC } from 'react';
import { useParams } from 'react-router';

import { ClubDescription } from '../club-description/club-description.tsx';
import { ClubHistory } from '../club-history/club-history.tsx';
import { ClubTrophiesList } from '../club-trophies-list/club-trophies-list.tsx';

import { ClubContentSkeleton } from './club-content-skeleton.tsx';
import styles from './club-content.module.scss';

export const ClubContent: FC = () => {
  const { id } = useParams();

  const { data: club, isLoading, isError } = useClubQuery(id);
  const { favoriteIds, toggleFavorite, isPending, loadingClubId } = useFavoritesContext();

  usePageMeta({
    title: club ? `${club.name} | #iLoveThisGame` : undefined,
    description: club ? `${club.name} — клуб из ${club.country}` : undefined,
  });

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки клуба" />;
  }

  if (isLoading) {
    return <ClubContentSkeleton />;
  }

  if (!club) {
    return <StateMessage variant="empty" title="Клуб не найден" />;
  }

  const isFavorite = favoriteIds.includes(club.id);
  const isToggleLoading = loadingClubId === club.id;

  return (
    <div className={styles.clubContent}>
      <PageTitle title={club.name || 'Club'} teamColors={club.colors} />
      <div className={styles.header}>
        <ClubLogo logo={club.logo} isFavorite={isFavorite} />
        <ClubDescription
          ground={club.ground}
          country={club.country}
          founded={club.founded}
          city={club.city}
          website={club.website}
          social={club.social}
        />
      </div>

      <Button
        variant="primary"
        disabled={isPending}
        loading={isToggleLoading}
        className={styles.favoriteButton}
        onClick={() => toggleFavorite(club.id, isFavorite)}
      >
        {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </Button>

      {club.trophies.length > 0 && <ClubTrophiesList trophies={club.trophies} />}

      <ClubHistory text={club.history} />
    </div>
  );
};
