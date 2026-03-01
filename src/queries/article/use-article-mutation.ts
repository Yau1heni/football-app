import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from 'api/articles-api.ts';
import type { Article, ReactionType } from 'types/articles.type.ts';
import { calculateReactionDelta } from 'utils/calculate-reaction-delta.ts';

import {
  getArticleCommentsQueryKeys,
  getArticleQueryKeys,
  getArticleUserReactionQueryKeys,
} from './keys.ts';

export type SetArticleReactionVariables = {
  articleId: string;
  userId: string;
  type: ReactionType;
  /** Текущая реакция пользователя (или null), нужна для расчёта оптимистичного likesCount/dislikesCount */
  previousReactionType: ReactionType | null;
};

export const useSetArticleReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, userId, type }: SetArticleReactionVariables) =>
      articlesApi.setUserReaction(articleId, userId, type),

    onMutate: async (variables) => {
      const { articleId, type, previousReactionType } = variables;
      const queryKey = getArticleQueryKeys(articleId);

      await queryClient.cancelQueries({ queryKey });

      const previousArticle = queryClient.getQueryData<Article>(queryKey) ?? null;

      if (previousArticle) {
        const { likeDelta, dislikeDelta } = calculateReactionDelta(previousReactionType, type);
        queryClient.setQueryData<Article>(queryKey, {
          ...previousArticle,
          likesCount: previousArticle.likesCount + likeDelta,
          dislikesCount: previousArticle.dislikesCount + dislikeDelta,
        });
      }

      return { previousArticle };
    },

    onError: (_err, variables, context) => {
      if (context?.previousArticle != null) {
        queryClient.setQueryData(getArticleQueryKeys(variables.articleId), context.previousArticle);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: getArticleQueryKeys(variables.articleId) });
      queryClient.invalidateQueries({
        queryKey: getArticleUserReactionQueryKeys(variables.articleId, variables.userId),
      });
    },
  });
};

export type AddArticleCommentVariables = {
  articleId: string;
  userId: string;
  name: string;
  text: string;
  parentCommentId?: string | null;
};

export const useAddArticleCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, text, userId, name, parentCommentId }: AddArticleCommentVariables) =>
      articlesApi.addComment(articleId, { userId, text, name, parentCommentId }),

    onSuccess: (_commentId, variables) => {
      queryClient.invalidateQueries({
        queryKey: getArticleCommentsQueryKeys(variables.articleId),
      });
      queryClient.invalidateQueries({ queryKey: getArticleQueryKeys(variables.articleId) });
    },
  });
};

export type RemoveArticleCommentVariables = {
  articleId: string;
  commentId: string;
};

export const useRemoveArticleCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, commentId }: RemoveArticleCommentVariables) =>
      articlesApi.removeComment(articleId, commentId),

    onSuccess: (_commentId, variables) => {
      queryClient.invalidateQueries({
        queryKey: getArticleCommentsQueryKeys(variables.articleId),
      });
      queryClient.invalidateQueries({ queryKey: getArticleQueryKeys(variables.articleId) });
    },
  });
};
