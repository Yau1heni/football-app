import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import type { ArticleComment } from 'types/articles.type.ts';
import { formatTimestamp } from 'utils/format-timestamp.ts';

import styles from './comment-item.module.scss';

export const COMMENT_INDENT_PX = 20;

export type CommentItemProps = {
  comment: ArticleComment;
  depth: number;
  onReply?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
};

export const CommentItem: FC<CommentItemProps> = ({ comment, depth, onReply, onDelete }) => {
  const dateStr = formatTimestamp(comment.timestamp);

  return (
    <article
      className={styles.root}
      style={{ marginLeft: depth * COMMENT_INDENT_PX }}
      data-depth={depth}
    >
      <header className={styles.header}>
        <Typography tag="span" view="p-16" weight="medium">
          {comment.name ?? 'Аноним'}
        </Typography>
        {dateStr && (
          <Typography tag="span" view="p-14" color="secondary">
            {dateStr}
          </Typography>
        )}
      </header>
      {comment.text && (
        <Typography tag="p" view="p-16" className={styles.text}>
          {comment.text}
        </Typography>
      )}
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
    </article>
  );
};
