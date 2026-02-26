import { START_PAGE } from 'constants/pagination.ts';

import cn from 'classnames';
import { usePagination } from 'components/pagination/use-pagination.ts';
import { Button } from 'components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';

import styles from './pagination.module.scss';

type PaginationProps = {
  /** Общее количество элементов */
  total?: number;
  /** Текущая страница */
  page?: number;
  /** Callback, вызываемый при взаимодействии с элементами пагинации */
  onChange?: (value: number) => void;
};

export const Pagination: FC<PaginationProps> = ({ total = 0, page = START_PAGE, onChange }) => {
  const pages = usePagination({ total, page });

  const handlePrev = () => {
    if (page > START_PAGE) onChange?.(page - 1);
  };

  const handleNext = () => {
    if (page < pages.length) onChange?.(page + 1);
  };

  const onItemClick = (page: number | string) => typeof page === 'number' && onChange?.(page);

  return (
    <div className={styles.pagination}>
      <Button
        variant={'ghost'}
        onClick={handlePrev}
        disabled={page === START_PAGE}
        className={styles.arrowButton}
      >
        <ArrowRightIcon
          width={32}
          widths={32}
          viewBox={'0 0 32 32'}
          color={page === START_PAGE ? 'secondary' : 'primary'}
          aria-label={'перейти на прошлую страницу'}
        />
      </Button>

      <div className={styles.paginationItems}>
        {pages.map((p, index) => (
          <Button
            key={index}
            disabled={p === '...'}
            onClick={() => onItemClick(p)}
            className={cn(
              styles.paginationItem,
              page === p && styles.active,
              p === '...' && styles.dots
            )}
          >
            <Typography view={'p-18'} color={page === p ? 'light' : 'primary'}>
              {p}
            </Typography>
          </Button>
        ))}
      </div>

      <Button
        variant={'ghost'}
        onClick={handleNext}
        disabled={page >= pages.length}
        className={styles.arrowButton}
      >
        <ArrowLeftIcon
          width={32}
          widths={32}
          viewBox={'0 0 32 32'}
          color={page >= pages.length ? 'secondary' : 'primary'}
          aria-label={'перейти на следующую страницу'}
        />
      </Button>
    </div>
  );
};
