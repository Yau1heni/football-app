import { StateMessage } from 'components/state-message';
import type { FC } from 'react';

import { ArticleCommentForm } from '../article-comment-form';
import styles from '../article-comments.module.scss';

type ArticleCommentsEmptyProps = {
  onSubmitRoot: (text: string) => void;
  isLoading: boolean;
};

export const ArticleCommentsEmpty: FC<ArticleCommentsEmptyProps> = ({
  onSubmitRoot,
  isLoading,
}) => (
  <div className={styles.articleComments}>
    <ArticleCommentForm
      onSubmit={onSubmitRoot}
      placeholder="Введите комментарий..."
      loading={isLoading}
    />
    <StateMessage
      variant="empty"
      title="Пока нет комментариев"
      description="Оставьте свой комментарий"
    />
  </div>
);
