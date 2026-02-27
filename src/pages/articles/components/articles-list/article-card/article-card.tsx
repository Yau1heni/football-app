import { DEFAULT_CLUB_IMAGE } from 'constants/images.ts';

import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { type FC, memo } from 'react';
import { Link } from 'react-router';
import type { Article } from 'types/articles.type';

import styles from './article-card.module.scss';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = memo(({ article }) => {
  return (
    <Link to={routes.article.create(article.id)} className={styles.link}>
      <article className={styles.articleCard}>
        <div className={styles.image}>
          <img src={DEFAULT_CLUB_IMAGE} alt="article img" />
        </div>
        <div className={styles.articleCardBody}>
          <Typography tag="h2" view="p-20" weight="bold" maxLines={2}>
            {article.title}
          </Typography>
          <Typography view="p-16" color="secondary" maxLines={3}>
            {article.excerpt}
          </Typography>
          <div className={styles.meta}>
            <Typography tag={'span'}>{article.category}</Typography>
            <Typography tag={'span'}>
              {article.likesCount} лайк · {article.viewsCount} просмотров · {article.commentsCount}{' '}
              комм.
            </Typography>
          </div>
        </div>
      </article>
    </Link>
  );
});
