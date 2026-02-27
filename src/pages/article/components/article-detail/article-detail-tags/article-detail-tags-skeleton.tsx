import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import styles from './article-detail-tags.module.scss';

export const ArticleDetailTagsSkeleton: FC = () => {
  return (
    <div className={styles.articleDetailTags}>
      <Skeleton variant="rectangular" width={60} height={28} className={styles.tag} />
      <Skeleton variant="rectangular" width={80} height={28} className={styles.tag} />
      <Skeleton variant="rectangular" width={70} height={28} className={styles.tag} />
    </div>
  );
};
