import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import styles from './page-title.module.scss';

export const PageTitleSkeleton: FC = () => {
  return (
    <div className={styles.pageTitle}>
      <Skeleton variant="rectangular" width={'80%'} height={44} className={styles.goBack} />;
    </div>
  );
};
