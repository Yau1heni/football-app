import { Typography } from 'components/ui/typography';
import type { FC } from 'react';

import type { Option } from '../multi-dropdown.tsx';

import { DropdownListItem } from './dropdown-list-item.tsx';
import styles from './dropdown-list.module.scss';

type DropdownListProps = {
  open: boolean;
  disabled?: boolean;
  filteredOptions: Option[];
  onSelect: (option: Option) => void;
  selectedKeys: Set<string>;
};

export const DropdownList: FC<DropdownListProps> = (props) => {
  const { open, disabled, filteredOptions, onSelect, selectedKeys } = props;

  if (!open || disabled) return null;

  return (
    <div className={styles.dropdown}>
      {filteredOptions.length === 0 ? (
        <Typography view={'p-16'}>Нет вариантов</Typography>
      ) : (
        filteredOptions.map((opt) => (
          <DropdownListItem
            key={opt.key}
            option={opt}
            onSelect={onSelect}
            isSelected={selectedKeys.has(opt.key)}
          />
        ))
      )}
    </div>
  );
};
