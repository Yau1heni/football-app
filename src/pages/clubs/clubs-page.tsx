import { PAGINATION_LIMIT } from 'constants/pagination.ts';

import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { Pagination } from 'components/pagination';
import { usePageMeta } from 'hooks/use-page-meta.ts';
import { useClubsQuery } from 'queries/clubs';

import { ClubsFilters } from './components/clubs-filters';
import { ClubsList } from './components/clubs-list';
import { useClubsFilters } from './use-clubs-filters.ts';

export const ClubsPage = () => {
  const { queryOptions, setPage } = useClubsFilters();

  usePageMeta({ title: 'Клубы | #iLoveThisGame', description: 'Список футбольных клубов' });

  const { data, isLoading, isError } = useClubsQuery(queryOptions);

  return (
    <Layout>
      <PageTitle title={'Клубы'} />
      <ClubsFilters />
      <ClubsList clubs={data?.clubsData || []} isLoading={isLoading} isError={isError} />
      {data != null && data.found > PAGINATION_LIMIT && (
        <Pagination page={queryOptions.page} total={data.found} onChange={setPage} />
      )}
    </Layout>
  );
};
