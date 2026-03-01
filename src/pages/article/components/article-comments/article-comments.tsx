import { StateMessage } from 'components/state-message';
import { useArticleCommentsContext } from 'contexts/article-comments';
import type { FC } from 'react';

import { ArticleCommentsEmpty } from './article-comments-empty';
import { ArticleCommentsList } from './article-comments-list';
import { ArticleCommentsLoading } from './article-comments-loading';

export const ArticleComments: FC = () => {
  const { comments, isCommentsLoading, isCommentsError, addComment } = useArticleCommentsContext();

  const handleSubmitRoot = (text: string) => {
    addComment.mutate({ text, parentCommentId: null });
  };

  if (isCommentsError) {
    return <StateMessage variant={'error'} title={'Ошибка загрузки комментариев'} />;
  }

  if (isCommentsLoading) {
    return <ArticleCommentsLoading />;
  }

  if (comments.length === 0) {
    return (
      <ArticleCommentsEmpty onSubmitRoot={handleSubmitRoot} isLoading={addComment.isPending} />
    );
  }

  return <ArticleCommentsList />;
};
