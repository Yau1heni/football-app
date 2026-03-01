import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from 'api/articles-api.ts';
import { Timestamp } from 'firebase/firestore';
import type { Article, ArticleComment, Reaction, ReactionType } from 'types/articles.type.ts';
import { calculateReactionDelta } from 'utils/calculate-reaction-delta.ts';

import {
  getArticleCommentsQueryKeys,
  getArticleCommentsReactionQueryKeys,
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
      const { articleId, userId, type, previousReactionType } = variables;
      const articleQueryKey = getArticleQueryKeys(articleId);
      const reactionQueryKey = getArticleUserReactionQueryKeys(articleId, userId);

      await queryClient.cancelQueries({ queryKey: articleQueryKey });
      await queryClient.cancelQueries({ queryKey: reactionQueryKey });

      const previousArticle = queryClient.getQueryData<Article>(articleQueryKey) ?? null;
      const previousReactionData =
        queryClient.getQueryData<Reaction | null>(reactionQueryKey) ?? null;

      if (previousArticle) {
        const { likeDelta, dislikeDelta } = calculateReactionDelta(previousReactionType, type);
        queryClient.setQueryData<Article>(articleQueryKey, {
          ...previousArticle,
          likesCount: previousArticle.likesCount + likeDelta,
          dislikesCount: previousArticle.dislikesCount + dislikeDelta,
        });
      }

      const isToggleOff = previousReactionType === type;
      const optimisticReaction: Reaction | null = isToggleOff
        ? null
        : { userId, timestamp: Timestamp.now(), type };
      queryClient.setQueryData<Reaction | null>(reactionQueryKey, optimisticReaction);

      return { previousArticle, previousReactionData, reactionQueryKey };
    },

    onError: (_err, variables, context) => {
      if (context?.previousArticle != null) {
        queryClient.setQueryData(getArticleQueryKeys(variables.articleId), context.previousArticle);
      }
      if (context?.reactionQueryKey != null) {
        queryClient.setQueryData(context.reactionQueryKey, context.previousReactionData);
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

export type SetCommentReactionVariables = SetArticleReactionVariables & { commentId: string };

export const useSetCommentReactionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, userId, commentId, type }: SetCommentReactionVariables) =>
      articlesApi.setUserCommentReaction(articleId, userId, commentId, type),

    onMutate: async (variables) => {
      const { articleId, commentId, userId, type, previousReactionType } = variables;
      const commentsQueryKey = getArticleCommentsQueryKeys(articleId);
      const reactionQueryKey = getArticleCommentsReactionQueryKeys(articleId, commentId, userId);

      await queryClient.cancelQueries({ queryKey: commentsQueryKey });
      await queryClient.cancelQueries({ queryKey: reactionQueryKey });

      const previousComments = queryClient.getQueryData<ArticleComment[]>(commentsQueryKey) ?? null;
      const previousReactionData =
        queryClient.getQueryData<Reaction | null>(reactionQueryKey) ?? null;

      if (previousComments) {
        const { likeDelta, dislikeDelta } = calculateReactionDelta(previousReactionType, type);
        const nextComments = previousComments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likesCount: c.likesCount + likeDelta,
                dislikesCount: c.dislikesCount + dislikeDelta,
              }
            : c
        );
        queryClient.setQueryData<ArticleComment[]>(commentsQueryKey, nextComments);
      }

      const isToggleOff = previousReactionType === type;
      const optimisticReaction: Reaction | null = isToggleOff
        ? null
        : { userId, timestamp: Timestamp.now(), type };
      queryClient.setQueryData<Reaction | null>(reactionQueryKey, optimisticReaction);

      return { previousComments, previousReactionData, reactionQueryKey };
    },

    onError: (_err, variables, context) => {
      if (context?.previousComments != null) {
        queryClient.setQueryData(
          getArticleCommentsQueryKeys(variables.articleId),
          context.previousComments
        );
      }
      if (context?.reactionQueryKey != null) {
        queryClient.setQueryData(context.reactionQueryKey, context.previousReactionData);
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: getArticleCommentsQueryKeys(variables.articleId) });
      queryClient.invalidateQueries({
        queryKey: getArticleCommentsReactionQueryKeys(
          variables.articleId,
          variables.commentId,
          variables.userId
        ),
      });
    },
  });
};
