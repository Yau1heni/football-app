import cn from 'classnames';
import { Loader } from 'components/ui/loader';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import styles from './button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: ReactNode;
};

export const Button: FC<ButtonProps> = (props) => {
  const { loading, children, className, ...rest } = props;

  const finallyClassName = cn(styles.button, loading && styles.buttonLoading, className);

  return (
    <button className={finallyClassName} disabled={loading} {...rest}>
      {loading && <Loader className={styles.loader} size={'s'} />}
      {children}
    </button>
  );
};
