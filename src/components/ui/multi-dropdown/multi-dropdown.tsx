import cn from 'classnames';
import { ArrowDownIcon } from 'components/ui/icons';
import { Input } from 'components/ui/input';
import type { FC } from 'react';

import { DropdownList } from '../multi-dropdown/dropdown-list';

import styles from './multi-dropdown.module.scss';
import { useMultiDropdown } from './use-multi-dropdown.ts';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export const MultiDropdown: FC<MultiDropdownProps> = (props) => {
  const { options, className, value, onChange, getTitle, disabled } = props;

  const {
    open,
    setOpen,
    search,
    setSearch,
    filteredOptions,
    handleSelect,
    containerRef,
    selectedKeys,
  } = useMultiDropdown(options, value, onChange);

  const getInputValue = () => {
    if (open) return search;
    if (value.length > 0) return getTitle(value);

    return '';
  };

  const handleFocus = () => {
    setOpen(true);
    setSearch('');
  };

  return (
    <div ref={containerRef} className={cn(styles.multiDropdown, className)}>
      <Input
        disabled={disabled}
        className={styles.input}
        value={getInputValue()}
        placeholder={getTitle(value)}
        onFocus={handleFocus}
        onChange={setSearch}
        readOnly={disabled}
        afterSlot={<ArrowDownIcon color={'secondary'} />}
        autoComplete={'off'}
        id={'multiDropdown'}
      />

      <DropdownList
        open={open}
        disabled={disabled}
        filteredOptions={filteredOptions}
        onSelect={handleSelect}
        selectedKeys={selectedKeys}
      />
    </div>
  );
};
