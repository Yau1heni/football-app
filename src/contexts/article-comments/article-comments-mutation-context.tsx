import type {
  AddArticleCommentVariables,
  RemoveArticleCommentVariables,
  SetCommentReactionVariables,
} from 'queries/article';
import { createContext, useContext } from 'react';

/** Обновляется при старте/конце мутации и refetch */
export type ArticleCommentsMutationContextValue = {
  isCommentsLoading: boolean;
  isCommentsError: boolean;
  isRefetching: boolean;
  addComment: {
    isPending: boolean;
    variables: AddArticleCommentVariables | undefined;
  };
  removeComment: {
    isPending: boolean;
    variables: RemoveArticleCommentVariables | undefined;
  };
  setCommentReaction: {
    isPending: boolean;
    variables: SetCommentReactionVariables | undefined;
  };
};

const ArticleCommentsMutationContext = createContext<ArticleCommentsMutationContextValue | null>(
  null
);

export const useArticleCommentsMutation = (): ArticleCommentsMutationContextValue => {
  const context = useContext(ArticleCommentsMutationContext);
  if (context === null) {
    throw new Error('useArticleCommentsMutation must be used within ArticleCommentsProvider');
  }
  return context;
};

export { ArticleCommentsMutationContext };
