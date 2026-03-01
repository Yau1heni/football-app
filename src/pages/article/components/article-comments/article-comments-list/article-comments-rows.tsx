import { useArticleCommentsData } from 'contexts/article-comments';
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { buildCommentsDisplayList } from 'utils/article-comments.ts';

import { ArticleCommentRow } from '../article-comment-row';

export type ArticleCommentsRowsProps = {
  replyingToCommentId: string | null;
  onReply: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (parentCommentId: string, text: string) => void;
};

export const ArticleCommentsRows: FC<ArticleCommentsRowsProps> = memo((props) => {
  const { replyingToCommentId, onReply, onDelete, onCancelReply, onSubmitReply } = props;
  const { comments } = useArticleCommentsData();

  const displayList = useMemo(() => buildCommentsDisplayList(comments), [comments]);

  return (
    <>
      {displayList.map(({ comment, depth }) => (
        <ArticleCommentRow
          key={comment.id}
          comment={comment}
          depth={depth}
          isReplying={replyingToCommentId === comment.id}
          onReply={onReply}
          onDelete={onDelete}
          onCancelReply={onCancelReply}
          onSubmitReply={onSubmitReply}
        />
      ))}
    </>
  );
});
