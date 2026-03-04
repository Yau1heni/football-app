import { type FC } from 'react';

import { ClubCardSkeleton } from './club-card/club-card-skeleton.tsx';
import styles from './clubs-list.module.scss';

const SKELETON_CARD_COUNT = 6;

export const ClubsListSkeleton: FC = () => (
  <div className={styles.clubsList}>
    <div className={styles.list}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <ClubCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
