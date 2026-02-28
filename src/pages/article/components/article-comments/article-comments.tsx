import { StateMessage } from 'components/state-message';
import { useArticleCommentsQuery } from 'queries/article';
import type { FC } from 'react';
import { useState } from 'react';
import { buildCommentsDisplayList } from 'utils/article-comments.ts';

import styles from './article-comments.module.scss';
import { CommentForm } from './comment-form';
import { CommentRow } from './comment-row';

type ArticleCommentsProps = {
  articleId: string | undefined;
};

export const ArticleComments: FC<ArticleCommentsProps> = ({ articleId }) => {
  const id = articleId ?? '';
  const { data: comments, isLoading, isError } = useArticleCommentsQuery(id);

  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);

  const handleReply = (commentId: string) => {
    setReplyingToCommentId(commentId);
  };

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки комментариев" />;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (comments && comments.length === 0) {
    return (
      <StateMessage
        variant="empty"
        title="Пока нет комментариев"
        description="Оставьте свой комментарий"
      />
    );
  }

  const displayList = comments ? buildCommentsDisplayList(comments) : [];

  return (
    <div className={styles.articleComments}>
      <CommentForm
        onSubmit={() => {
          /* empty */
        }}
        onCancel={() => {
          /* empty */
        }}
        placeholder="Введите комментарий..."
      />
      {displayList.map(({ comment, depth }) => (
        <CommentRow
          key={comment.id}
          comment={comment}
          depth={depth}
          isReplying={replyingToCommentId === comment.id}
          onReply={handleReply}
          onDelete={() => {
            /* empty */
          }}
          onCancelReply={() => setReplyingToCommentId(null)}
          onSubmitReply={() => {
            /* empty */
          }}
        />
      ))}
    </div>
  );
};
