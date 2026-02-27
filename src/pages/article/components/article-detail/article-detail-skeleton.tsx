import { ContentContainer } from 'components/content-container';
import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import { ArticleDetailTagsSkeleton } from './article-detail-tags';
import styles from './article-detail.module.scss';

export const ArticleDetailSkeleton: FC = () => (
  <>
    <ContentContainer isSkeleton={true}>
      <article className={styles.articleDetail}>
        <ArticleDetailTagsSkeleton />
        <div>
          <Skeleton variant="rectangular" height="100%" className={styles.articleCover} />
        </div>
        <div className={styles.articleMeta}>
          <Skeleton variant="text" width={80} height={14} />
          <Skeleton variant="text" width={180} height={14} />
        </div>

        <div className={styles.articleContent}>
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="80%" />
        </div>
      </article>
    </ContentContainer>
  </>
);
