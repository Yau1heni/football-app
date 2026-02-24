import { useQuery } from '@tanstack/react-query';
import { clubsApi } from 'api/clubs-api.ts';

export const useClubQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: ['club', id],
    enabled: !!id,
    queryFn: () => {
      // излишняя проверка, queryFn вызывается только при enabled (!!id)
      // но TS здесь тип не сужает
      if (!id) {
        throw new Error('Club id is required');
      }
      return clubsApi.getClub(id);
    },
    staleTime: 60 * 1000, // 1 мин
  });
};
