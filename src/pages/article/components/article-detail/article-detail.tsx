import { DEFAULT_ARTICLE_IMAGE } from 'constants/images.ts';

import { ContentContainer } from 'components/content-container';
import { HtmlContent } from 'components/html-content';
import { ReactionButtons } from 'components/reaction-buttons';
import { StateMessage } from 'components/state-message';
import { Typography } from 'components/ui/typography';
import { useAuthContext } from 'contexts/auth';
import {
  useArticleQuery,
  useArticleUserReactionQuery,
  useSetArticleReactionMutation,
} from 'queries/article';
import type { FC } from 'react';
import { REACTION } from 'types/articles.type.ts';

import { ArticleDetailSkeleton } from './article-detail-skeleton.tsx';
import { ArticleDetailTags } from './article-detail-tags';
import styles from './article-detail.module.scss';

type ArticleDetailProps = {
  articleId: string | undefined;
};

export const ArticleDetail: FC<ArticleDetailProps> = ({ articleId }) => {
  const id = articleId ?? '';
  const { data: article, isError, isLoading } = useArticleQuery(id);
  const { user } = useAuthContext();
  const userId = user?.uid ?? '';
  const { data: userReaction } = useArticleUserReactionQuery(id, userId);
  const setReaction = useSetArticleReactionMutation();

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки статьи" />;
  }

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article) {
    return <StateMessage variant="empty" title="Статья не найдена" />;
  }

  const timestamp = article.timestamp.toDate().toLocaleDateString();

  const handleLike = () => {
    if (!userId) return;
    setReaction.mutate({
      articleId: article.id,
      userId,
      type: REACTION.LIKE,
      previousReactionType: userReaction?.type ?? null,
    });
  };

  const handleDislike = () => {
    if (!userId) return;
    setReaction.mutate({
      articleId: article.id,
      userId,
      type: REACTION.DISLIKE,
      previousReactionType: userReaction?.type ?? null,
    });
  };

  return (
    <ContentContainer title={article.title}>
      <article className={styles.articleDetail}>
        {article.tags.length > 0 && <ArticleDetailTags tags={article.tags} />}

        <div className={styles.articleCover}>
          <img
            src={article.coverImageUrl ? article.coverImageUrl : DEFAULT_ARTICLE_IMAGE}
            alt="article img"
          />
        </div>

        <div className={styles.articleMeta}>
          {timestamp && (
            <Typography tag={'span'} color={'secondary'}>
              {timestamp}
            </Typography>
          )}
          <Typography tag={'span'} color={'secondary'}>
            {article.category} · {article.viewsCount} просмотров · {article.commentsCount} комм.
          </Typography>
        </div>

        <div className={styles.articleContent}>
          <HtmlContent html={article.content} />
        </div>

        <div className={styles.reactionSection}>
          <ReactionButtons
            likesCount={article.likesCount}
            dislikesCount={article.dislikesCount}
            userReaction={userReaction?.type ?? null}
            onLike={handleLike}
            onDislike={handleDislike}
            disabled={!userId || setReaction.isPending}
          />
        </div>
      </article>
    </ContentContainer>
  );
};
