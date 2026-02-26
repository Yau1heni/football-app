import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import styles from './card.module.scss';

type CardSkeletonProps = {
  isWithAction?: boolean;
};

export const CardSkeleton: FC<CardSkeletonProps> = ({ isWithAction = false }) => {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.image} width="100%" />
      <div className={styles.cardBody}>
        <div className={styles.content}>
          <Skeleton variant="text" width="100%" height={12} />
          <Skeleton variant="text" width="90%" height={12} />
          <Skeleton variant="text" width="70%" height={20} />
          <Skeleton variant="text" width="60%" />
        </div>
        <div className={styles.footer}>
          <Skeleton className={styles.contentSlot} variant="text" width="20%" />
          {isWithAction && <Skeleton width={220} height={50} />}
        </div>
      </div>
    </div>
  );
};
