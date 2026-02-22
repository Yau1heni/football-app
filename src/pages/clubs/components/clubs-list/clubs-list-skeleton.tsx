import { CardSkeleton } from 'components/ui/card';
import { type FC } from 'react';

import styles from './clubs-list.module.scss';

const SKELETON_CARD_COUNT = 6;

export const ClubsListSkeleton: FC = () => (
  <div className={styles.clubsList}>
    <div className={styles.list}>
      {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
        <div key={index} className={styles.cardWrapper}>
          <CardSkeleton />
        </div>
      ))}
    </div>
  </div>
);
