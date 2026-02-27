import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { usePageMeta } from 'hooks/use-page-meta.ts';

export const ArticlePage = () => {
  usePageMeta({ title: 'Статья | #iLoveThisGame', description: 'Статья о футболе' });

  return (
    <Layout>
      <PageTitle title={'Статья'} />
      ArticlePage
    </Layout>
  );
};
