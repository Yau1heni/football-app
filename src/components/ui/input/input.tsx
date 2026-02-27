import cn from 'classnames';
import { type ChangeEvent, forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

import styles from './input.module.scss';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: ReactNode;
  /** Ошибка валидации (красная обводка) */
  error?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { value, onChange, afterSlot, className, error, ...rest } = props;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <div className={cn(styles.inputContainer, className)}>
      <input
        className={cn(styles.input, value && styles.notEmpty, error && styles.inputError)}
        value={value}
        ref={ref}
        onChange={handleOnChange}
        type="text"
        {...rest}
      />
      <div className={styles.afterSlot}>{afterSlot}</div>
    </div>
  );
});
