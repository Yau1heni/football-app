import { ContentContainer } from 'components/content-container';
import { PageTitleSkeleton } from 'components/page-title';
import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import { ClubTrophiesListSkeleton } from '../club-trophies-list/club-trophies-list-skeleton.tsx';

import styles from './club-content.module.scss';

export const ClubContentSkeleton: FC = () => (
  <div className={styles.clubContent}>
    <PageTitleSkeleton />
    <header className={styles.header}>
      <div className={styles.imageContainer}>
        <Skeleton variant="circular" width={280} height={280} className={styles.logo} />
      </div>
      <ContentContainer title={'Информация о клубу'}>
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="30%" />
      </ContentContainer>
    </header>
    <ClubTrophiesListSkeleton />
    <ContentContainer title={'История'}>
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="85%" />
    </ContentContainer>
  </div>
);
