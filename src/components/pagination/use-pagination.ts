import { PAGINATION_LIMIT, START_PAGE } from 'constants/pagination.ts';

export type UsePaginationProps = {
  /** Всего страниц */
  total: number;
  /** Текущая страница */
  page: number;
  /** Количество элементов на странице */
  perPage?: number;
};

export type UsePaginationResult = (number | '...')[];

const createRange = (start: number, end: number): number[] => {
  const res: number[] = [];
  for (let i = start; i <= end; i++) res.push(i);
  return res;
};

export const usePagination = ({
  total,
  page,
  perPage = PAGINATION_LIMIT,
}: UsePaginationProps): UsePaginationResult => {
  const pageCount = Math.ceil(total / Math.max(perPage, START_PAGE));

  if (pageCount <= 5) return createRange(START_PAGE, pageCount);

  const pages: (number | '...')[] = [];

  // Всегда показываем первую страницу
  pages.push(START_PAGE);

  if (page <= 4) {
    // начало
    pages.push(...createRange(2, 5));
    pages.push('...');
  } else if (page >= pageCount - 3) {
    // конец
    pages.push('...');
    pages.push(...createRange(pageCount - 4, pageCount - 1));
  } else {
    // середина
    pages.push('...');
    pages.push(page - 1, page, page + 1);
    pages.push('...');
  }

  // Всегда показываем последнюю страницу
  pages.push(pageCount);

  return pages;
};
