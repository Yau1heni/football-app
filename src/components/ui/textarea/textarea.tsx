import cn from 'classnames';
import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import styles from './textarea.module.scss';

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { value, onChange, className, error, ...rest } = props;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.currentTarget.value);
  };

  return (
    <textarea
      ref={ref}
      className={cn(
        styles.textarea,
        value && styles.notEmpty,
        error && styles.textareaError,
        className
      )}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
