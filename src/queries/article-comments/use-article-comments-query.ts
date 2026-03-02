import { STALE_TIME_MS } from 'constants/queries.ts';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { articlesApi, COMMENTS_PAGE_SIZE } from 'api/articles-api.ts';
import type { QueryDocumentSnapshot } from 'firebase/firestore';
import type { ArticleComment } from 'types/articles.types.ts';

import { getArticleCommentsQueryKeys, getArticleCommentsReactionQueryKeys } from './keys.ts';

export const useArticleCommentsQuery = (articleId: string) => {
  return useInfiniteQuery({
    queryKey: getArticleCommentsQueryKeys(articleId),
    queryFn: ({ pageParam }) => articlesApi.getComments(articleId, COMMENTS_PAGE_SIZE, pageParam),
    initialPageParam: undefined as QueryDocumentSnapshot<ArticleComment> | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDoc : undefined),
    enabled: !!articleId,
    staleTime: STALE_TIME_MS,
  });
};

export const useArticleCommentsReactionQuery = (
  articleId: string,
  commentId: string,
  userId: string
) => {
  return useQuery({
    queryKey: getArticleCommentsReactionQueryKeys(articleId, commentId, userId),
    enabled: !!articleId && !!userId && !!commentId,
    queryFn: () => articlesApi.getUserReactionByCommentId(articleId, commentId, userId),
    staleTime: STALE_TIME_MS,
  });
};
