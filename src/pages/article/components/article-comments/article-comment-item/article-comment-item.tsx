import cn from 'classnames';
import { ReactionButtons } from 'components/reaction-buttons';
import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import { useArticleCommentsData, useArticleCommentsMutation } from 'contexts/article-comments';
import { useArticleCommentsReactionQuery } from 'queries/article';
import type { FC } from 'react';
import { memo, useCallback } from 'react';
import { REACTION, type ArticleComment, type ReactionType } from 'types/articles.type.ts';
import { formatTimestamp } from 'utils/format-timestamp.ts';

import styles from './article-comment-item.module.scss';

export const COMMENT_INDENT_PX = 20;

export type ArticleCommentItemProps = {
  comment: ArticleComment;
  depth: number;
  onReply?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  onReaction?: (
    commentId: string,
    type: ReactionType,
    previousReactionType: ReactionType | null
  ) => void;
};

export const ArticleCommentItem: FC<ArticleCommentItemProps> = memo((props) => {
  const { comment, depth, onReply, onDelete, onReaction } = props;
  const { articleId, userId } = useArticleCommentsData();
  const { data: userReactionData } = useArticleCommentsReactionQuery(articleId, comment.id, userId);
  const userReaction = userReactionData?.type ?? null;
  const { setCommentReaction } = useArticleCommentsMutation();
  const isReactionPending =
    setCommentReaction.isPending && setCommentReaction.variables?.commentId === comment.id;

  const handleLike = useCallback(() => {
    onReaction?.(comment.id, REACTION.LIKE, userReaction);
  }, [comment.id, onReaction, userReaction]);

  const handleDislike = useCallback(() => {
    onReaction?.(comment.id, REACTION.DISLIKE, userReaction);
  }, [comment.id, onReaction, userReaction]);

  const formattedDate = formatTimestamp(comment.timestamp);
  const isDeleted = Boolean(comment.deleted);

  return (
    <article
      className={cn(
        styles.articleCommentItem,
        isDeleted && [styles.articleCommentItem, styles.deleted]
      )}
      style={{ marginLeft: depth * COMMENT_INDENT_PX }}
      data-depth={depth}
    >
      {!isDeleted && (
        <header className={styles.header}>
          <Typography tag="span" view="p-16" weight="medium">
            {comment.name ?? 'Аноним'}
          </Typography>
          {formattedDate && (
            <Typography tag="span" view="p-14" color="secondary">
              {formattedDate}
            </Typography>
          )}
        </header>
      )}
      {isDeleted ? (
        <Typography tag="p" view="p-16" color="secondary" className={styles.deletedText}>
          Комментарий удалён
        </Typography>
      ) : (
        comment.text && (
          <Typography tag="p" view="p-16" className={styles.text}>
            {comment.text}
          </Typography>
        )
      )}
      {!isDeleted && (
        <div className={styles.actions}>
          <ReactionButtons
            size="m"
            likesCount={comment.likesCount}
            dislikesCount={comment.dislikesCount}
            userReaction={userReaction}
            onLike={handleLike}
            onDislike={handleDislike}
            disabled={isReactionPending}
          />
          {onReply && (
            <Button variant="ghost" onClick={() => onReply(comment.id)}>
              Ответить
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" onClick={() => onDelete(comment.id)}>
              Удалить
            </Button>
          )}
        </div>
      )}
    </article>
  );
});
