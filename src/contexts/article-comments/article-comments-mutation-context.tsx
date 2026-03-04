import type {
  AddArticleCommentVariables,
  RemoveArticleCommentVariables,
  SetCommentReactionVariables,
} from 'queries/article-comments';
import { createContext, useContext } from 'react';

/** Обновляется при старте/конце мутации и refetch */
export type ArticleCommentsMutationContextValue = {
  /** true только при первой загрузке (нет страниц), не при подгрузке следующей страницы. */
  isInitialLoading: boolean;
  isCommentsError: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
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
