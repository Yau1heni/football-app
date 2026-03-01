import { useArticleCommentsData, useArticleCommentsMutation } from 'contexts/article-comments';
import { type FC, memo, useCallback, useState } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import { ArticleCommentSkeleton } from '../article-comment-item';

import styles from './article-comments-list.module.scss';
import { ArticleCommentsRows } from './article-comments-rows';

export const ArticleCommentsList: FC = memo(() => {
  const { addCommentMutate, removeCommentMutate } = useArticleCommentsData();
  const { addComment } = useArticleCommentsMutation();

  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);

  const handleSubmitRoot = useCallback(
    (text: string) => {
      addCommentMutate({ text, parentCommentId: null });
    },
    [addCommentMutate]
  );

  const handleSubmitReply = useCallback(
    (parentCommentId: string, text: string) => {
      addCommentMutate({ text, parentCommentId });
      setReplyingToCommentId(null);
    },
    [addCommentMutate]
  );

  const handleReply = useCallback((commentId: string) => {
    setReplyingToCommentId(commentId);
  }, []);

  const handleDelete = useCallback(
    (commentId: string) => {
      removeCommentMutate(commentId);
    },
    [removeCommentMutate]
  );

  const handleCancelReply = useCallback(() => {
    setReplyingToCommentId(null);
  }, []);

  const showAddRootSkeleton = addComment.isPending && !addComment.variables?.parentCommentId;

  return (
    <div className={styles.articleCommentsList}>
      <ArticleCommentForm
        onSubmit={handleSubmitRoot}
        placeholder="Введите комментарий..."
        loading={addComment.isPending}
      />
      {showAddRootSkeleton && <ArticleCommentSkeleton depth={0} />}
      <ArticleCommentsRows
        replyingToCommentId={replyingToCommentId}
        onReply={handleReply}
        onDelete={handleDelete}
        onCancelReply={handleCancelReply}
        onSubmitReply={handleSubmitReply}
      />
    </div>
  );
});
