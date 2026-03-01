import { Skeleton } from 'components/ui/skeleton';
import type { FC } from 'react';

import { COMMENT_INDENT_PX } from './article-comment-item';
import styles from './article-comment-item.module.scss';

export type ArticleCommentSkeletonProps = {
  depth?: number;
};

export const ArticleCommentSkeleton: FC<ArticleCommentSkeletonProps> = ({ depth = 0 }) => (
  <div
    className={styles.articleCommentItem}
    style={{ marginLeft: depth * COMMENT_INDENT_PX }}
    data-depth={depth}
  >
    <header className={styles.header}>
      <Skeleton variant={'text'} width={120} height={16} />
      <Skeleton variant={'text'} width={80} height={14} />
    </header>
    <div className={styles.text}>
      <Skeleton variant={'text'} width={'100%'} />
      <Skeleton variant={'text'} width={'85%'} />
    </div>
    <div className={styles.actions}>
      <Skeleton variant={'rectangular'} width={70} height={32} />
      <Skeleton variant={'rectangular'} width={60} height={32} />
      <Skeleton variant={'rectangular'} width={60} height={32} />
    </div>
  </div>
);
