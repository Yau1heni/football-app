import { STALE_TIME_MS } from 'constants/queries.ts';

import { useQuery } from '@tanstack/react-query';
import { clubsApi } from 'api/clubs-api.ts';
import { getClubQueryKeys } from 'queries/club/keys.ts';

export const useClubQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: getClubQueryKeys(id),
    enabled: !!id,
    queryFn: () => {
      // излишняя проверка, queryFn вызывается только при enabled (!!id)
      // но TS здесь тип не сужает
      if (!id) {
        throw new Error('Club id is required');
      }
      return clubsApi.getClub(id);
    },
    staleTime: STALE_TIME_MS,
  });
};
