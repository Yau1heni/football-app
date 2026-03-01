import { useAuthContext } from 'contexts/auth';
import {
  useAddArticleCommentMutation,
  useRemoveArticleCommentMutation,
  useArticleCommentsQuery,
} from 'queries/article';
import type { AddArticleCommentVariables, RemoveArticleCommentVariables } from 'queries/article';
import { useCallback, useMemo, type ReactNode } from 'react';

import {
  ArticleCommentsDataContext,
  useArticleCommentsData,
  type ArticleCommentsDataContextValue,
} from './article-comments-data-context.tsx';
import {
  ArticleCommentsMutationContext,
  useArticleCommentsMutation,
  type ArticleCommentsMutationContextValue,
} from './article-comments-mutation-context.tsx';

export type ArticleCommentsContextValue = ArticleCommentsDataContextValue & {
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  isRefetching: boolean;
  addComment: {
    mutate: (params: { text: string; parentCommentId?: string | null }) => void;
    isPending: boolean;
    variables: AddArticleCommentVariables | undefined;
  };
  removeComment: {
    mutate: (commentId: string) => void;
    isPending: boolean;
    variables: RemoveArticleCommentVariables | undefined;
  };
};

type ArticleCommentsProviderProps = {
  articleId: string;
  children: ReactNode;
};

export const ArticleCommentsProvider = ({ articleId, children }: ArticleCommentsProviderProps) => {
  const { user } = useAuthContext();
  const userId = user?.uid ?? '';
  const userName = user?.displayName ?? user?.email ?? 'Аноним';

  const {
    data: comments,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    isRefetching,
  } = useArticleCommentsQuery(articleId);
  const {
    mutate: addCommentMutation,
    isPending: addCommentIsPending,
    variables: addCommentVariables,
  } = useAddArticleCommentMutation();
  const {
    mutate: removeCommentMutation,
    isPending: removeCommentIsPending,
    variables: removeCommentVariables,
  } = useRemoveArticleCommentMutation();

  const addCommentMutate = useCallback(
    (params: { text: string; parentCommentId?: string | null }) => {
      if (!userId) return;
      addCommentMutation({
        articleId,
        userId,
        name: userName,
        text: params.text,
        parentCommentId: params.parentCommentId ?? null,
      });
    },
    [articleId, userId, userName, addCommentMutation]
  );

  const removeCommentMutate = useCallback(
    (commentId: string) => {
      removeCommentMutation({ articleId, commentId });
    },

    [articleId, removeCommentMutation]
  );

  const dataValue = useMemo<ArticleCommentsDataContextValue>(
    () => ({
      articleId,
      comments: comments ?? [],
      userId,
      userName,
      addCommentMutate,
      removeCommentMutate,
    }),
    [articleId, comments, userId, userName, addCommentMutate, removeCommentMutate]
  );

  const mutationValue = useMemo<ArticleCommentsMutationContextValue>(
    () => ({
      isCommentsLoading,
      isCommentsError,
      isRefetching,
      addComment: {
        isPending: addCommentIsPending,
        variables: addCommentVariables,
      },
      removeComment: {
        isPending: removeCommentIsPending,
        variables: removeCommentVariables,
      },
    }),
    [
      isCommentsLoading,
      isCommentsError,
      isRefetching,
      addCommentIsPending,
      addCommentVariables,
      removeCommentIsPending,
      removeCommentVariables,
    ]
  );

  return (
    <ArticleCommentsDataContext.Provider value={dataValue}>
      <ArticleCommentsMutationContext.Provider value={mutationValue}>
        {children}
      </ArticleCommentsMutationContext.Provider>
    </ArticleCommentsDataContext.Provider>
  );
};

export const useArticleCommentsContext = (): ArticleCommentsContextValue => {
  const data = useArticleCommentsData();
  const mutation = useArticleCommentsMutation();

  return useMemo<ArticleCommentsContextValue>(
    () => ({
      ...data,
      ...mutation,
      addComment: {
        mutate: data.addCommentMutate,
        isPending: mutation.addComment.isPending,
        variables: mutation.addComment.variables,
      },
      removeComment: {
        mutate: data.removeCommentMutate,
        isPending: mutation.removeComment.isPending,
        variables: mutation.removeComment.variables,
      },
    }),
    [data, mutation]
  );
};
