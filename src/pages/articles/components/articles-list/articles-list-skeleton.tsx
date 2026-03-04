import type { FC } from 'react';

import { ArticleCardSkeleton } from './article-card';

const SKELETON_COUNT = 5;

export const ArticlesListSkeleton: FC = () => (
  <ul>
    {Array.from({ length: SKELETON_COUNT }, (_, i) => (
      <li key={i}>
        <ArticleCardSkeleton />
      </li>
    ))}
  </ul>
);
