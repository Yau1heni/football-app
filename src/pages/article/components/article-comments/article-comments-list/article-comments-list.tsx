import { useArticleCommentsData, useArticleCommentsMutation } from 'contexts/article-comments';
import { type FC, memo, useCallback, useState } from 'react';
import type { ReactionType } from 'types/articles.type.ts';

import { ArticleCommentForm } from '../article-comment-form';
import { ArticleCommentSkeleton } from '../article-comment-item';

import styles from './article-comments-list.module.scss';
import { ArticleCommentsRows } from './article-comments-rows';

export const ArticleCommentsList: FC = memo(() => {
  const { addCommentMutate, removeCommentMutate, setCommentReactionMutate } =
    useArticleCommentsData();
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

  const handleReaction = useCallback(
    (commentId: string, type: ReactionType, previousReactionType: ReactionType | null) => {
      setCommentReactionMutate({ commentId, type, previousReactionType });
    },
    [setCommentReactionMutate]
  );

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
        onReaction={handleReaction}
      />
    </div>
  );
});
