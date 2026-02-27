import cn from 'classnames';
import type { CSSProperties, FC, HTMLAttributes } from 'react';

import styles from './skeleton.module.scss';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export type SkeletonAnimation = 'pulse' | 'wave' | 'none';

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  /** Вариант отображения */
  variant?: SkeletonVariant;
  /** Ширина (например: '100%', '200px', 120) */
  width?: number | string;
  /** Высота (например: '1em', '20px', 40) */
  height?: number | string;
  /** Тип анимации при загрузке */
  animation?: SkeletonAnimation;
  /** Дополнительный класс */
  className?: string;
};

export const Skeleton: FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className,
  style,
  ...rest
}) => {
  const resolvedStyle: CSSProperties = {
    ...style,
    ...(width != null && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height != null && { height: typeof height === 'number' ? `${height}px` : height }),
  };

  const finalClassName = cn(
    styles.skeleton,
    styles[variant],
    animation !== 'none' &&
      styles[`animation${animation.charAt(0).toUpperCase()}${animation.slice(1)}`],
    className
  );

  return <div className={finalClassName} style={resolvedStyle} data-testid="skeleton" {...rest} />;
};
