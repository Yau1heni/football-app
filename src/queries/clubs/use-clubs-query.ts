import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { clubsApi } from 'api/clubs-api.ts';
import { getClubsQueryKeys } from 'queries/clubs/keys.ts';
import type { GetClubsTypesenseOptions } from 'types/clubs.types.ts';

export const useClubsQuery = (options: GetClubsTypesenseOptions) => {
  return useQuery({
    queryKey: getClubsQueryKeys(options),
    queryFn: () => clubsApi.getFromTypesense(options),
    staleTime: STALE_TIME_MS,
  });
};
