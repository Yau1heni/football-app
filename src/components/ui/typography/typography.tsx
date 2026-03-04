import cn from 'classnames';
import type { CSSProperties, FC, ReactNode } from 'react';

import styles from './typography.module.scss';

export type TypographyProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'sectionTitle' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: ReactNode;
  /** Цвет */
  color?: 'primary' | 'light' | 'secondary' | 'accent' | 'error';
  /** Максимальное кол-во строк */
  maxLines?: number;
  /** Id для доступности (aria-labelledby и др.) */
  id?: string;
};

export const Typography: FC<TypographyProps> = (props) => {
  const {
    tag: Tag = 'p',
    color,
    maxLines,
    view = 'p-16',
    weight = 'normal',
    className,
    children,
    id,
  } = props;

  const finallyClassName = cn(
    styles.text,
    {
      [styles[`weight-${weight}`]]: weight,
      [styles[`view-${view}`]]: view,
      [styles[`color-${color}`]]: color,
    },
    styles[maxLines || 'key'],
    className
  );

  const style: CSSProperties = {};

  if (maxLines) {
    style.display = '-webkit-box';
    style.WebkitLineClamp = maxLines;
    style.WebkitBoxOrient = 'vertical';
    style.overflow = 'hidden';
  }

  return (
    <Tag id={id} className={finallyClassName} style={style}>
      {children}
    </Tag>
  );
};
