import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';

import { ClubsList } from './components/clubs-list';

export const ClubsPage = () => {
  return (
    <Layout>
      <PageTitle title={'Клубы'} />
      <ClubsList />
    </Layout>
  );
};
