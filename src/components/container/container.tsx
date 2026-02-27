import cn from 'classnames';
import type { FC, PropsWithChildren } from 'react';

import styles from './container.module.scss';

type ContainerProps = {
  className?: string;
} & PropsWithChildren;

export const Container: FC<ContainerProps> = ({ children, className }) => {
  const finallyClassName = cn(styles.container, className);

  return <div className={finallyClassName}>{children}</div>;
};
