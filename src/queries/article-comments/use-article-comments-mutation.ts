import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { articlesApi, type GetCommentsResult } from 'api/articles-api.ts';
import { Timestamp } from 'firebase/firestore';
import { getArticleQueryKeys } from 'queries/article/keys.ts';
import type { ArticleComment, Reaction, ReactionType } from 'types/articles.types.ts';
import { calculateReactionDelta } from 'utils/calculate-reaction-delta.ts';

import { getArticleCommentsQueryKeys, getArticleCommentsReactionQueryKeys } from './keys.ts';

const PENDING_COMMENT_ID_PREFIX = 'pending-';

export type AddArticleCommentVariables = {
  articleId: string;
  userId: string;
  name: string;
  text: string;
  parentCommentId?: string | null;
};

const createOptimisticComment = (variables: AddArticleCommentVariables): ArticleComment => ({
  id: `${PENDING_COMMENT_ID_PREFIX}${Date.now()}`,
  userId: variables.userId,
  name: variables.name,
  text: variables.text,
  parentCommentId: variables.parentCommentId ?? null,
  timestamp: Timestamp.now(),
  likesCount: 0,
  dislikesCount: 0,
});

export const isPendingComment = (comment: ArticleComment): boolean => {
  return comment.id.startsWith(PENDING_COMMENT_ID_PREFIX);
};

export const useAddArticleCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ articleId, text, userId, name, parentCommentId }: AddArticleCommentVariables) =>
      articlesApi.addComment(articleId, { userId, text, name, parentCommentId }),

    onMutate: async (variables) => {
      const { articleId, parentCommentId } = variables;
      const commentsQueryKey = getArticleCommentsQueryKeys(articleId);
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey) ?? null;
      const optimisticComment = createOptimisticComment(variables);

      let nextPages: GetCommentsResult[];
      if (!previousData?.pages.length) {
        nextPages = [
          {
            comments: [optimisticComment],
            lastDoc: null,
            hasMore: false,
          },
        ];
      } else {
        nextPages = previousData.pages.map((page, pageIndex) => {
          if (pageIndex === 0 && !parentCommentId) {
            return { ...page, comments: [optimisticComment, ...page.comments] };
          }
          if (parentCommentId && page.comments.some((c) => c.id === parentCommentId)) {
            return { ...page, comments: [...page.comments, optimisticComment] };
          }
          return page;
        });
      }

      queryClient.setQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey, {
        ...(previousData ?? { pageParams: [undefined] }),
        pages: nextPages,
      });
      return { previousData };
    },

    onSuccess: async (newCommentId, variables) => {
      const { articleId, parentCommentId } = variables;
      const commentsQueryKey = getArticleCommentsQueryKeys(articleId);
      const newComment = await articlesApi.getCommentById(articleId, newCommentId);
      if (!newComment) {
        queryClient.invalidateQueries({ queryKey: commentsQueryKey });
        return;
      }

      const data =
        queryClient.getQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey) ?? null;
      if (!data?.pages.length) return;

      const nextPages = data.pages.map((page, pageIndex) => {
        const comments = page.comments.filter((c) => !c.id.startsWith(PENDING_COMMENT_ID_PREFIX));
        const isRoot = !parentCommentId && pageIndex === 0;
        const hasParent = parentCommentId && page.comments.some((c) => c.id === parentCommentId);
        if (isRoot) return { ...page, comments: [newComment, ...comments] };
        if (hasParent) return { ...page, comments: [...comments, newComment] };
        return { ...page, comments };
      });

      queryClient.setQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey, {
        ...data,
        pages: nextPages,
      });
    },

    onError: (_err, variables, context) => {
      if (context?.previousData != null) {
        queryClient.setQueryData(
          getArticleCommentsQueryKeys(variables.articleId),
          context.previousData
        );
      }
    },

    onSettled: (_data, _error, variables) => {
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

    onMutate: async (variables) => {
      const { articleId, commentId } = variables;
      const commentsQueryKey = getArticleCommentsQueryKeys(articleId);
      await queryClient.cancelQueries({ queryKey: commentsQueryKey });

      const previousData =
        queryClient.getQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey) ?? null;
      if (!previousData?.pages.length) return { previousData };

      const nextPages = previousData.pages.map((page) => ({
        ...page,
        comments: page.comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                deleted: true,
                userId: null,
                name: null,
                text: null,
                likesCount: 0,
                dislikesCount: 0,
              }
            : c
        ),
      }));
      queryClient.setQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey, {
        ...previousData,
        pages: nextPages,
      });
      return { previousData };
    },

    onSuccess: (_data, variables) => {
      const { articleId, commentId } = variables;
      const commentsQueryKey = getArticleCommentsQueryKeys(articleId);
      const data =
        queryClient.getQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey) ?? null;
      if (!data?.pages.length) return;

      const nextPages = data.pages.map((page) => ({
        ...page,
        comments: page.comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                deleted: true,
                userId: null,
                name: null,
                text: null,
                likesCount: 0,
                dislikesCount: 0,
              }
            : c
        ),
      }));
      queryClient.setQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey, {
        ...data,
        pages: nextPages,
      });
    },

    onError: (_err, variables, context) => {
      if (context?.previousData != null) {
        queryClient.setQueryData(
          getArticleCommentsQueryKeys(variables.articleId),
          context.previousData
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: getArticleCommentsQueryKeys(variables.articleId),
      });
      queryClient.invalidateQueries({ queryKey: getArticleQueryKeys(variables.articleId) });
    },
  });
};

export type SetCommentReactionVariables = {
  articleId: string;
  userId: string;
  commentId: string;
  type: ReactionType;
  previousReactionType: ReactionType | null;
};

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

      const previousCommentsData =
        queryClient.getQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey) ?? null;
      const previousReactionData =
        queryClient.getQueryData<Reaction | null>(reactionQueryKey) ?? null;

      if (previousCommentsData) {
        const { likeDelta, dislikeDelta } = calculateReactionDelta(previousReactionType, type);
        const nextPages = previousCommentsData.pages.map((page) => ({
          ...page,
          comments: page.comments.map((c) =>
            c.id === commentId
              ? {
                  ...c,
                  likesCount: c.likesCount + likeDelta,
                  dislikesCount: c.dislikesCount + dislikeDelta,
                }
              : c
          ),
        }));
        queryClient.setQueryData<InfiniteData<GetCommentsResult>>(commentsQueryKey, {
          ...previousCommentsData,
          pages: nextPages,
        });
      }

      const isToggleOff = previousReactionType === type;
      const optimisticReaction: Reaction | null = isToggleOff
        ? null
        : { userId, timestamp: Timestamp.now(), type };
      queryClient.setQueryData<Reaction | null>(reactionQueryKey, optimisticReaction);

      return { previousCommentsData, previousReactionData, reactionQueryKey };
    },

    onError: (_err, variables, context) => {
      if (context?.previousCommentsData != null) {
        queryClient.setQueryData(
          getArticleCommentsQueryKeys(variables.articleId),
          context.previousCommentsData
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
