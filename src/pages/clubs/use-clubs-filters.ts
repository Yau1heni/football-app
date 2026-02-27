import { START_PAGE } from 'constants/pagination.ts';
import { QUERY_PARAMS } from 'constants/query-params.ts';

import { useSearchParams } from 'react-router';

export const useClubsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get(QUERY_PARAMS.SEARCH) ?? '';

  const rawPage = searchParams.get(QUERY_PARAMS.PAGE);
  const page = rawPage ? Math.max(START_PAGE, parseInt(rawPage, 10)) : START_PAGE;

  const applySearch = (value: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(QUERY_PARAMS.SEARCH, value);
          next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
        } else next.delete(QUERY_PARAMS.SEARCH);
        return next;
      },
      { replace: true }
    );
  };

  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page) next.set(QUERY_PARAMS.PAGE, String(page));
      else next.delete(QUERY_PARAMS.PAGE);
      return next;
    });
  };

  return { page, searchTerm, applySearch, setPage };
};
