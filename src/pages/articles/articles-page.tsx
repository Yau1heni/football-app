import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { usePageMeta } from 'hooks/use-page-meta.ts';
import { ArticlesList } from 'pages/articles/components/articles-list';

const ArticlesPage = () => {
  usePageMeta({ title: 'Статьи | #iLoveThisGame', description: 'Статьи о футболе' });

  return (
    <Layout>
      <PageTitle title={'Статьи'} />
      <ArticlesList />
    </Layout>
  );
};

export default ArticlesPage;
