import { STALE_TIME_MS } from 'constants/queries.ts';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ARTICLES_PAGE_SIZE, articlesApi } from 'api/articles-api.ts';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { Article } from 'types/articles.type.ts';

import { getArticlesQueryKeys } from './keys.ts';

type ArticlesPageParam = QueryDocumentSnapshot<Article> | undefined;

export const useArticlesQuery = () => {
  return useInfiniteQuery({
    queryKey: getArticlesQueryKeys(),
    queryFn: ({ pageParam }) => articlesApi.getAll(ARTICLES_PAGE_SIZE, pageParam),
    initialPageParam: undefined as ArticlesPageParam,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDoc : undefined),
    staleTime: STALE_TIME_MS,
  });
};
