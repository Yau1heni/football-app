import { clubsApi } from 'api/clubs-api.ts';
import { Layout } from 'components/layout';
import { PageTitle } from 'components/page-title';
import { useAsync } from 'hooks/use-async.ts';
import { Filters } from 'pages/clubs/components/filters';
import { useSearchParams } from 'react-router';
import type { Club } from 'types/clubs.types.ts';

import { ClubsList } from './components/clubs-list';

const SEARCH_PARAM = 'search';

export const ClubsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get(SEARCH_PARAM) ?? '';

  const { data, isLoading, isError } = useAsync<Club[]>(
    () => clubsApi.getClubsFromTypesense({ page: 1, searchTerm }),
    [searchTerm]
  );

  const applySearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(SEARCH_PARAM, value);
        else next.delete(SEARCH_PARAM);
        return next;
      },
      { replace: true }
    );
  };

  return (
    <Layout>
      <PageTitle title={'Клубы'} />
      <Filters initialSearch={searchTerm} onApplySearch={applySearch} />
      <ClubsList clubs={data || []} isLoading={isLoading} isError={isError} />
    </Layout>
  );
};
