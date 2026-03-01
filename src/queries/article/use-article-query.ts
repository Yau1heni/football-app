import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { articlesApi } from 'api/articles-api.ts';

import {
  getArticleCommentsQueryKeys,
  getArticleCommentsReactionQueryKeys,
  getArticleQueryKeys,
  getArticleUserReactionQueryKeys,
} from './keys.ts';

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
    queryKey: getArticleCommentsQueryKeys(articleId),
    enabled: !!articleId,
    queryFn: () => articlesApi.getComments(articleId),
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
