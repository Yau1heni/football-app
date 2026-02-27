import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import styles from './article-card.module.scss';

export const ArticleCardSkeleton: FC = () => (
  <div className={styles.articleCard}>
    <div className={styles.image}>
      <Skeleton variant="rectangular" height="100%" className={styles.imageSkeleton} />
    </div>
    <div className={styles.articleCardBody}>
      <Skeleton variant="text" width="100%" className={styles.title} />
      <Skeleton variant="text" width="90%" className={styles.excerpt} />
      <Skeleton variant="text" width="85%" className={styles.excerpt} />
      <div className={styles.meta}>
        <Skeleton variant="text" width={60} height={14} className={styles.metaItem} />
        <Skeleton variant="text" width={120} height={14} className={styles.metaItem} />
      </div>
    </div>
  </div>
);
