import { Skeleton } from 'components/ui/skeleton';

import styles from './card.module.scss';

export const CardSkeleton = () => {
  return (
    <div className={styles.card}>
      <Skeleton className={styles.image} width="100%" height={350} />
      <div className={styles.cardBody}>
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton className={styles.button} width={180} height={40} />
      </div>
    </div>
  );
};
