import { useQuery } from '@tanstack/react-query';
import { clubsApi } from 'api/clubs-api.ts';

export const useClubsQuery = (page: number, searchTerm: string) => {
  return useQuery({
    queryKey: ['clubs', { page, searchTerm }],
    queryFn: () => clubsApi.getFromTypesense({ page, searchTerm }),
    staleTime: 60 * 1000, // 1 мин
  });
};
