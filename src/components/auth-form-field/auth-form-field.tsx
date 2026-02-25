import { Button } from 'components/ui/button';
import { EyeIcon, EyeOffIcon } from 'components/ui/icons';
import { Input } from 'components/ui/input';
import { Typography } from 'components/ui/typography';
import { type FC, memo, useId, useState } from 'react';

import styles from './auth-form-field.module.scss';

export type AuthFormFieldProps = {
  /** Результат getFieldProps из useFormValidation */
  fieldProps: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    error: boolean;
    errorMessage: string | null;
  };
  /** Текст подписи (label) */
  label: string;
  /** Плейсхолдер */
  placeholder?: string;
  /** Тип инпута */
  type?: 'text' | 'email' | 'password';
  /** Значение autoComplete */
  autoComplete?: string;
};

export const AuthFormField: FC<AuthFormFieldProps> = memo((props) => {
  const { fieldProps, label, placeholder, type = 'text', autoComplete } = props;

  const baseId = useId();
  const inputId = `${baseId}-input`;
  const errorId = `${baseId}-error`;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && passwordVisible ? 'text' : type;

  const togglePassword = () => setPasswordVisible((v) => !v);

  const afterSlot = isPassword ? (
    <Button
      variant={'ghost'}
      type={'button'}
      onClick={togglePassword}
      aria-label={passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}
    >
      {passwordVisible ? <EyeOffIcon color="secondary" /> : <EyeIcon color="secondary" />}
    </Button>
  ) : undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <Input
        id={inputId}
        type={inputType}
        value={fieldProps.value}
        onChange={fieldProps.onChange}
        onBlur={fieldProps.onBlur}
        placeholder={placeholder}
        error={fieldProps.error}
        aria-invalid={fieldProps.error}
        aria-describedby={fieldProps.error ? errorId : undefined}
        autoComplete={autoComplete}
        afterSlot={afterSlot}
      />
      {fieldProps.errorMessage && (
        <Typography tag={'span'} id={errorId} color={'error'} className={styles.errorMessage}>
          {fieldProps.errorMessage}
        </Typography>
      )}
    </div>
  );
});
