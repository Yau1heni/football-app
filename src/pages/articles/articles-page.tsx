import { Layout } from 'components/layout';
import { usePageMeta } from 'hooks/use-page-meta.ts';

export const ArticlesPage = () => {
  usePageMeta({ title: 'Статьи | #iLoveThisGame', description: 'Статьи о футболе' });

  return <Layout>ArticlesPage</Layout>;
};
