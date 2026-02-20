import { InputSearch } from 'components/input-search';
import { useState } from 'react';

import styles from './filters.module.scss';

type FiltersProps = {
  initialSearch: string;
  onApplySearch: (value: string) => void;
};

export const Filters = ({ initialSearch, onApplySearch }: FiltersProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  const onSearch = () => onApplySearch(searchTerm);

  return (
    <div className={styles.filters}>
      <InputSearch searchTerm={searchTerm} onChange={setSearchTerm} action={onSearch} />
    </div>
  );
};
