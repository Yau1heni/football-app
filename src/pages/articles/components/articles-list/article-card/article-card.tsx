import { DEFAULT_ARTICLE_IMAGE } from 'constants/images.ts';
import { RU_LIKE, RU_VIEW } from 'constants/plural.ts';

import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { type FC, memo } from 'react';
import { Link } from 'react-router';
import type { Article } from 'types/articles.types.ts';
import { getCommentsCountLabel } from 'utils/article-comments.ts';
import { plural } from 'utils/plural.ts';

import styles from './article-card.module.scss';

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard: FC<ArticleCardProps> = memo(({ article }) => {
  return (
    <Link to={routes.article.create(article.id)} className={styles.link}>
      <article className={styles.articleCard}>
        <div className={styles.image}>
          <img
            src={article.coverImageUrl ? article.coverImageUrl : DEFAULT_ARTICLE_IMAGE}
            alt={'article img'}
          />
        </div>
        <div className={styles.articleCardBody}>
          <Typography tag={'h2'} view={'p-20'} weight={'bold'} maxLines={2}>
            {article.title}
          </Typography>
          <Typography view={'p-16'} color={'secondary'} maxLines={3}>
            {article.excerpt}
          </Typography>
          <div className={styles.meta}>
            <Typography tag={'span'}>{article.category}</Typography>
            <Typography tag={'span'}>
              {article.likesCount} {plural(article.likesCount, RU_LIKE)} · {article.viewsCount}{' '}
              {plural(article.viewsCount, RU_VIEW)} · {article.commentsCount}{' '}
              {getCommentsCountLabel(article.commentsCount)}
            </Typography>
          </div>
        </div>
      </article>
    </Link>
  );
});
