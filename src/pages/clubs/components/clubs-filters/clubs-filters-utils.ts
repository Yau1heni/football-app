import { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import type { FilterOption } from 'utils/filter-options.ts';
import { getOptionsTitle } from 'utils/filter-options.ts';

export const CLUB_SORT_BY = {
  NAME: 'name',
  TOTAL_TROPHIES: 'totalTrophies',
  FOUNDED: 'founded',
} as const;

export const CLUB_COUNTRIES_OPTIONS: FilterOption[] = [
  { key: 'Россия', value: 'Россия' },
  { key: 'Беларусь', value: 'Беларусь' },
  { key: 'Казахстан', value: 'Казахстан' },
  { key: 'Украина', value: 'Украина' },
  { key: 'Англия', value: 'Англия' },
  { key: 'Германия', value: 'Германия' },
  { key: 'Испания', value: 'Испания' },
  { key: 'Италия', value: 'Италия' },
  { key: 'Франция', value: 'Франция' },
];

export const getCountriesTitle = (options: FilterOption[]): string =>
  getOptionsTitle(options, 'Страны');

const SORT_COMBINED_LABELS: Record<string, string> = {
  [`${CLUB_SORT_BY.NAME}_${SORT_DIRECTIONS.ASC}`]: 'По имени А–Я',
  [`${CLUB_SORT_BY.NAME}_${SORT_DIRECTIONS.DESC}`]: 'По имени Я–А',
  [`${CLUB_SORT_BY.TOTAL_TROPHIES}_${SORT_DIRECTIONS.ASC}`]: 'Трофеи по возрастанию',
  [`${CLUB_SORT_BY.TOTAL_TROPHIES}_${SORT_DIRECTIONS.DESC}`]: 'Трофеи по убыванию',
  [`${CLUB_SORT_BY.FOUNDED}_${SORT_DIRECTIONS.ASC}`]: 'По году основания по возрастанию',
  [`${CLUB_SORT_BY.FOUNDED}_${SORT_DIRECTIONS.DESC}`]: 'По году основания по убыванию',
};

export const getClubsSortOptions: FilterOption[] = Object.entries(SORT_COMBINED_LABELS).map(
  ([key, value]) => ({ key, value })
);
