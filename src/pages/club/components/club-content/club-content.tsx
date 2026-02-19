import { clubsApi } from 'api/clubs-api.ts';
import { ClubLogo } from 'components/club-logo';
import { PageTitle } from 'components/page-title';
import { StateMessage } from 'components/state-message';
import { useAsync } from 'hooks/use-async.ts';
import type { FC } from 'react';
import { useParams } from 'react-router';
import type { Club } from 'types/clubs.types.ts';

import { ClubDescription } from '../club-description/club-description.tsx';
import { ClubHistory } from '../club-history/club-history.tsx';
import { ClubTrophiesList } from '../club-trophies-list/club-trophies-list.tsx';

import { ClubContentSkeleton } from './club-content-skeleton.tsx';
import styles from './club-content.module.scss';

export const ClubContent: FC = () => {
  const { id } = useParams();
  const {
    data: club,
    isLoading,
    isError,
  } = useAsync<Club | null>(() => clubsApi.getClub(id || ''), [id]);

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки клуба" />;
  }

  if (isLoading) {
    return <ClubContentSkeleton />;
  }

  if (!club) {
    return <StateMessage variant="empty" title="Клуб не найден" />;
  }

  return (
    <div className={styles.clubContent}>
      <PageTitle title={club.name || 'Club'} teamColors={club.colors} />
      <div className={styles.header}>
        <ClubLogo logo={club.logo} />
        <div className={styles.descriptionBlock}>
          <ClubDescription
            ground={club.ground}
            country={club.country}
            founded={club.founded}
            city={club.city}
            website={club.website}
            social={club.social}
          />
        </div>
      </div>

      {club.trophies.length > 0 && <ClubTrophiesList trophies={club.trophies} />}

      <ClubHistory text={club.history} />
    </div>
  );
};
