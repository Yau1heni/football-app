import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { clubsApi } from 'api/clubs-api.ts';
import { getClubsQueryKeys } from 'queries/clubs/keys.ts';

export const useClubsQuery = (page: number, searchTerm: string) => {
  return useQuery({
    queryKey: getClubsQueryKeys({ page, searchTerm }),
    queryFn: () => clubsApi.getFromTypesense({ page, searchTerm }),
    staleTime: STALE_TIME_MS,
  });
};
