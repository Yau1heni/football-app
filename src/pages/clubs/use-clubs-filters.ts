import { START_PAGE } from 'constants/pagination.ts';
import { QUERY_PARAMS } from 'constants/query-params.ts';

import { useFavoritesContext } from 'contexts/favorites';
import {
  CLUB_COUNTRIES_OPTIONS,
  getClubsSortOptions,
} from 'pages/clubs/components/clubs-filters/clubs-filters-utils.ts';
import { useSearchParams } from 'react-router';
import type { GetClubsTypesenseOptions } from 'types/clubs.types.ts';
import { type FilterOption, getOptionByKey, getSelectedOptions } from 'utils/filter-options.ts';

export const useClubsFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteIds } = useFavoritesContext();

  // —— Поиск ——
  const searchTerm = searchParams.get(QUERY_PARAMS.SEARCH) ?? '';
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

  // —— Страница ——
  const rawPage = searchParams.get(QUERY_PARAMS.PAGE);
  const page = rawPage ? Math.max(START_PAGE, parseInt(rawPage, 10)) : START_PAGE;
  const setPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page) next.set(QUERY_PARAMS.PAGE, String(page));
      else next.delete(QUERY_PARAMS.PAGE);
      return next;
    });
  };

  // —— Сортировка (по количеству трофеев, дате основания, имени) ——
  const sort = searchParams.get(QUERY_PARAMS.SORT) ?? '';
  const sortOption = getOptionByKey(sort, getClubsSortOptions);
  const setSortOption = (option: FilterOption | null) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (option?.key) next.set(QUERY_PARAMS.SORT, option.key);
        else next.delete(QUERY_PARAMS.SORT);
        next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
        return next;
      },
      { replace: true }
    );
  };

  // —— Страны ——
  const countriesRaw = searchParams.get(QUERY_PARAMS.COUNTRIES);
  const countries = countriesRaw ? countriesRaw.split(',').filter(Boolean) : [];
  const countriesOptions = getSelectedOptions(countries, CLUB_COUNTRIES_OPTIONS);
  const setCountriesOptions = (options: FilterOption[]) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        const values = options.map((o) => o.value);
        if (values.length) next.set(QUERY_PARAMS.COUNTRIES, values.join(','));
        else next.delete(QUERY_PARAMS.COUNTRIES);
        next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
        return next;
      },
      { replace: true }
    );
  };

  // —— Избранное ——
  const favoritesOnly = searchParams.get(QUERY_PARAMS.FAVORITES_ONLY) === 'true';
  const setFavoritesOnly = (value: boolean) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(QUERY_PARAMS.FAVORITES_ONLY, 'true');
        else next.delete(QUERY_PARAMS.FAVORITES_ONLY);
        next.set(QUERY_PARAMS.PAGE, String(START_PAGE));
        return next;
      },
      { replace: true }
    );
  };

  // —— Сброс ——
  const resetFilters = () => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(QUERY_PARAMS.SEARCH);
        next.delete(QUERY_PARAMS.SORT);
        next.delete(QUERY_PARAMS.COUNTRIES);
        next.delete(QUERY_PARAMS.FAVORITES_ONLY);
        next.delete(QUERY_PARAMS.PAGE);
        return next;
      },
      { replace: true }
    );
  };

  // Опции для запроса за клубами
  const queryOptions: GetClubsTypesenseOptions = {
    page,
    searchTerm,
    ...(sort && { sort }),
    ...(countries.length > 0 && { countries }),
    ...(favoritesOnly && { favoritesIds: favoriteIds }),
  };

  return {
    queryOptions,
    sortOption,
    countriesOptions,
    favoritesOnly,
    applySearch,
    setPage,
    setSortOption,
    setCountriesOptions,
    setFavoritesOnly,
    resetFilters,
  };
};
