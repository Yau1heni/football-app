import cn from 'classnames';
import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import { memo } from 'react';
import type { ArticleComment } from 'types/articles.type.ts';
import { formatTimestamp } from 'utils/format-timestamp.ts';

import styles from './article-comment-item.module.scss';

export const COMMENT_INDENT_PX = 20;

export type ArticleCommentItemProps = {
  comment: ArticleComment;
  depth: number;
  onReply?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
};

export const ArticleCommentItem: FC<ArticleCommentItemProps> = memo((props) => {
  const { comment, depth, onReply, onDelete } = props;

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
        <>
          <div className={styles.meta}>
            <Typography tag="span" view="p-14" color="secondary">
              Лайков: {comment.likesCount} · Дизлайков: {comment.dislikesCount}
            </Typography>
          </div>
          <div className={styles.actions}>
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
        </>
      )}
    </article>
  );
});
