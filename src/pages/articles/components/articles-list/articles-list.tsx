import { StateMessage } from 'components/state-message';
import { Button } from 'components/ui/button';
import { useArticlesQuery } from 'queries/articles';
import { type FC } from 'react';

import { ArticleCard } from './article-card';
import { ArticlesListSkeleton } from './articles-list-skeleton.tsx';

export const ArticlesList: FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } =
    useArticlesQuery();

  const articles = data?.pages.flatMap((page) => page.articles) ?? [];

  if (isError) {
    return <StateMessage variant="error" title="Ошибка загрузки статей" />;
  }

  if (isLoading) {
    return <ArticlesListSkeleton />;
  }

  if (articles.length === 0) {
    return <StateMessage variant="empty" title="Статьи не найдены" />;
  }

  return (
    <>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <Button variant={'ghost'} onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Загрузка…' : 'Еще'}
        </Button>
      )}
    </>
  );
};
