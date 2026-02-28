import type { FC } from 'react';
import type { ArticleComment } from 'types/articles.type.ts';

import { CommentForm } from '../comment-form';
import { CommentItem } from '../comment-item';
import { COMMENT_INDENT_PX } from '../comment-item';

export type CommentRowProps = {
  comment: ArticleComment;
  depth: number;
  isReplying: boolean;
  onReply: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onCancelReply: () => void;
  onSubmitReply: (text: string) => void;
};

export const CommentRow: FC<CommentRowProps> = (props) => {
  const { comment, depth, isReplying, onReply, onDelete, onCancelReply, onSubmitReply } = props;

  return (
    <>
      <CommentItem comment={comment} depth={depth} onReply={onReply} onDelete={onDelete} />
      {isReplying && (
        <div style={{ marginLeft: (depth + 1) * COMMENT_INDENT_PX }}>
          <CommentForm
            onSubmit={onSubmitReply}
            onCancel={onCancelReply}
            placeholder="Ответ на комментарий..."
          />
        </div>
      )}
    </>
  );
};
