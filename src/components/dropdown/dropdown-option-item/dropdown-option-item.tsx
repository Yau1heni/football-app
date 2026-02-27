import cn from 'classnames';
import type { FC, MouseEvent } from 'react';

import type { DropdownOption } from '../use-dropdown';

import styles from './dropdown-option-item.module.scss';

export type DropdownOptionItemProps = {
  option: DropdownOption;
  isSelected: boolean;
  onSelect: (option: DropdownOption) => void;
};

export const DropdownOptionItem: FC<DropdownOptionItemProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    onSelect(option);
  };

  return (
    <div
      role="option"
      aria-selected={isSelected}
      className={cn(styles.option, { [styles.optionSelected]: isSelected })}
      onMouseDown={handleMouseDown}
    >
      {option.value}
    </div>
  );
};
