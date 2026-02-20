import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import type { FC } from 'react';

import styles from './input-search.module.scss';

type InputSearchProps = {
  searchTerm: string;
  onChange: (value: string) => void;
  action: () => void;
};

export const InputSearch: FC<InputSearchProps> = ({ searchTerm, onChange, action }) => {
  return (
    <div className={styles.inputSearch}>
      <Input value={searchTerm} onChange={onChange} />
      <Button onClick={action}>Найти</Button>
    </div>
  );
};
