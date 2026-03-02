import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesApi } from 'api/articles-api.ts';
import { Timestamp } from 'firebase/firestore';
import type { Article, Reaction, ReactionType } from 'types/articles.types.ts';
import { calculateReactionDelta } from 'utils/calculate-reaction-delta.ts';

import { getArticleQueryKeys, getArticleUserReactionQueryKeys } from './keys.ts';

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
