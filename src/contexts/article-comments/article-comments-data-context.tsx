import { createContext, useContext } from 'react';
import type { ArticleComment, ReactionType } from 'types/articles.type.ts';

/** Обновляется только при смене данных запроса (refetch). Не зависит от isPending/variables. */
export type ArticleCommentsDataContextValue = {
  articleId: string;
  comments: ArticleComment[];
  userId: string;
  userName: string;
  addCommentMutate: (params: { text: string; parentCommentId?: string | null }) => void;
  removeCommentMutate: (commentId: string) => void;
  setCommentReactionMutate: (params: {
    commentId: string;
    type: ReactionType;
    previousReactionType: ReactionType | null;
  }) => void;
};

const ArticleCommentsDataContext = createContext<ArticleCommentsDataContextValue | null>(null);

export const useArticleCommentsData = (): ArticleCommentsDataContextValue => {
  const context = useContext(ArticleCommentsDataContext);
  if (context === null) {
    throw new Error('useArticleCommentsData must be used within ArticleCommentsProvider');
  }
  return context;
};

export { ArticleCommentsDataContext };
