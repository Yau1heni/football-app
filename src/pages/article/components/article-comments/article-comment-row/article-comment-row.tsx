import type { FC } from 'react';
import { memo } from 'react';
import type { ArticleComment, ReactionType } from 'types/articles.types.ts';

import { ArticleCommentForm } from '../article-comment-form';
import { ArticleCommentItem, COMMENT_INDENT_PX } from '../article-comment-item';

export type ArticleCommentRowProps = {
  comment: ArticleComment;
  depth: number;
  isReplying: boolean;
  onReply: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onCancelReply: () => void;
  /** (parentCommentId, text) — родитель вызовет с comment.id */
  onSubmitReply: (parentCommentId: string, text: string) => void;
  onReaction: (
    commentId: string,
    type: ReactionType,
    previousReactionType: ReactionType | null
  ) => void;
};

export const ArticleCommentRow: FC<ArticleCommentRowProps> = memo((props) => {
  const {
    comment,
    depth,
    isReplying,
    onReply,
    onDelete,
    onCancelReply,
    onSubmitReply,
    onReaction,
  } = props;

  return (
    <>
      <ArticleCommentItem
        comment={comment}
        depth={depth}
        onReply={onReply}
        onDelete={onDelete}
        onReaction={onReaction}
      />
      {isReplying && (
        <div style={{ marginLeft: (depth + 1) * COMMENT_INDENT_PX }}>
          <ArticleCommentForm
            onSubmit={(text) => onSubmitReply(comment.id, text)}
            onCancel={onCancelReply}
            placeholder={'Ответ на комментарий...'}
          />
        </div>
      )}
    </>
  );
});
