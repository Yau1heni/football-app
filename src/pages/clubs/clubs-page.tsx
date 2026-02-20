import { PAGINATION_LIMIT } from 'constants/pagination.ts';

import { clubsApi } from 'api/clubs-api.ts';
import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { Pagination } from 'components/pagination';
import { useAsync } from 'hooks/use-async.ts';
import type { GetClubsResponse } from 'types/clubs.types.ts';

import { ClubsList } from './components/clubs-list';
import { Filters } from './components/filters';
import { useClubsFilters } from './use-clubs-filters.ts';

export const ClubsPage = () => {
  const { page, searchTerm, applySearch, setPage } = useClubsFilters();

  const { data, isLoading, isError } = useAsync<GetClubsResponse>(
    () => clubsApi.getClubsFromTypesense({ page, searchTerm }),
    [searchTerm, page]
  );

  return (
    <Layout>
      <PageTitle title={'Клубы'} />
      <Filters initialSearch={searchTerm} onApplySearch={applySearch} />
      <ClubsList clubs={data?.clubsData || []} isLoading={isLoading} isError={isError} />
      {data?.found && data.found > PAGINATION_LIMIT && (
        <Pagination page={page} total={data.found} onChange={setPage} />
      )}
    </Layout>
  );
};
