import cn from 'classnames';
import type { FC } from 'react';

import styles from './loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ size = 'l', className }) => {
  const finallyClassName = cn(styles.loader, styles[size], className);

  return <div className={finallyClassName} data-testid="loader" />;
};
