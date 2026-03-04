import type { FC } from 'react';

import { ArticleCommentSkeleton } from '../article-comment-item';

const DEFAULT_COUNT = 3;

export type ArticleCommentsListSkeletonProps = {
  count?: number;
};

export const ArticleCommentsListSkeleton: FC<ArticleCommentsListSkeletonProps> = ({
  count = DEFAULT_COUNT,
}) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <ArticleCommentSkeleton key={i} depth={0} />
    ))}
  </>
);
