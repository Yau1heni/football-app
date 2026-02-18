import cn from 'classnames';
import type { FC, PropsWithChildren, SVGAttributes } from 'react';

import styles from './icon.module.scss';

export type IconProps = SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

export const Icon: FC<PropsWithChildren<IconProps>> = (props) => {
  const {
    className,
    color,
    width = 24,
    height = 24,
    children,
    viewBox = '0 0 24 24',
    ...rest
  } = props;

  return (
    <svg
      width={width}
      height={height}
      stroke="currentColor"
      fill="currentColor"
      viewBox={viewBox}
      className={cn(color ? styles[color] : undefined, styles.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {children}
    </svg>
  );
};
