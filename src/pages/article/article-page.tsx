import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { usePageMeta } from 'hooks/use-page-meta.ts';
import { ArticleDetail } from 'pages/article/components/article-detail';
import { useParams } from 'react-router';

export const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  usePageMeta({ title: 'Статья | #iLoveThisGame', description: 'Статья о футболе' });

  return (
    <Layout>
      <PageTitle title={'Назад'} />
      <ArticleDetail articleId={id} />
    </Layout>
  );
};
