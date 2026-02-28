import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { articlesApi } from 'api/articles-api.ts';

import { getArticleQueryKeys, getArticleUserReactionQueryKeys } from './keys.ts';

export const useArticleQuery = (articleId: string) => {
  return useQuery({
    queryKey: getArticleQueryKeys(articleId),
    enabled: !!articleId,
    queryFn: () => articlesApi.getById(articleId),
    staleTime: STALE_TIME_MS,
  });
};

export const useArticleUserReactionQuery = (articleId: string, userId: string) => {
  return useQuery({
    queryKey: getArticleUserReactionQueryKeys(articleId, userId),
    enabled: !!articleId && !!userId,
    queryFn: () => articlesApi.getUserReactionById(articleId, userId),
    staleTime: STALE_TIME_MS,
  });
};

export const useArticleCommentsQuery = (articleId: string) => {
  return useQuery({
    queryKey: ['articleComments', articleId],
    enabled: !!articleId,
    queryFn: () => articlesApi.getComments(articleId),
  });
};
