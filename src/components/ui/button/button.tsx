import cn from 'classnames';
import { Loader } from 'components/ui/loader';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'ghost';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: ReactNode;
  /** Внешний вид кнопки: primary — основная, ghost — без фона (для иконок в хедере и т.п.) */
  variant?: ButtonVariant;
};

export const Button: FC<ButtonProps> = (props) => {
  const { loading, children, className, variant = 'primary', ...rest } = props;

  const finallyClassName = cn(
    styles.button,
    styles[`button_${variant}`],
    loading && styles.buttonLoading,
    className
  );

  return (
    <button className={finallyClassName} disabled={loading} {...rest}>
      {loading && <Loader className={styles.loader} size={'s'} />}
      {children}
    </button>
  );
};
