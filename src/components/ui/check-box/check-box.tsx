import cn from 'classnames';
import type { ChangeEvent } from 'react';
import React from 'react';

import styles from './check-box.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, className, ...rest }) => {
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked);
  };

  return (
    <label>
      <input
        className={cn(styles.checkbox, className)}
        onChange={handleOnchange}
        type="checkbox"
        id={'checkBox'}
        {...rest}
      />
    </label>
  );
};
