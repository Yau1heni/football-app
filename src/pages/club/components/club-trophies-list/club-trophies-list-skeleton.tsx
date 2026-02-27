import { ContentContainer } from 'components/content-container';
import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import styles from './club-trophies-list.module.scss';

export const ClubTrophiesListSkeleton: FC = () => {
  return (
    <ContentContainer title={'Трофеи'}>
      <div className={styles.clubTrophiesList}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            variant="rectangular"
            width={160}
            height={120}
            className={styles.trophyBlock}
          />
        ))}
      </div>
    </ContentContainer>
  );
};
