import type { FC } from 'react';

import styles from './article-detail-tags.module.scss';

type ArticleDetailTagsProps = {
  tags: string[];
};

export const ArticleDetailTags: FC<ArticleDetailTagsProps> = ({ tags }) => {
  return (
    <ul className={styles.articleDetailTags}>
      {tags.map((tag, i) => (
        <li key={i} className={styles.tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
};
