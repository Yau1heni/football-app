import { PAGINATION_LIMIT } from 'constants/pagination.ts';

import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { Pagination } from 'components/pagination';
import { usePageMeta } from 'hooks/use-page-meta.ts';
import { useClubsQuery } from 'queries/clubs';

import { ClubsList } from './components/clubs-list';
import { Filters } from './components/filters';
import { useClubsFilters } from './use-clubs-filters.ts';

export const ClubsPage = () => {
  const { page, searchTerm, applySearch, setPage } = useClubsFilters();

  usePageMeta({ title: 'Клубы | #iLoveThisGame', description: 'Список футбольных клубов' });

  const { data, isLoading, isError } = useClubsQuery(page, searchTerm);

  return (
    <Layout>
      <PageTitle title={'Клубы'} />
      <Filters initialSearch={searchTerm} onApplySearch={applySearch} />
      <ClubsList clubs={data?.clubsData || []} isLoading={isLoading} isError={isError} />
      {data != null && data.found > PAGINATION_LIMIT && (
        <Pagination page={page} total={data.found} onChange={setPage} />
      )}
    </Layout>
  );
};
