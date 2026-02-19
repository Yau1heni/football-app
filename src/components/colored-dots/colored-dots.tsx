import type { FC } from 'react';

import styles from './colored-dots.module.scss';

export type ColorDotItem = {
  letter: string;
  color: string;
};

type ColoredDotsProps = {
  /** Цвета (без букв), игнорируется если передан items */
  colors?: string[];
  /** Элементы с буквой и цветом (приоритет над colors) */
  items?: ColorDotItem[];
};

export const ColoredDots: FC<ColoredDotsProps> = ({ colors, items }) => {
  const list = items ?? (colors?.length ? colors.map((color) => ({ letter: '', color })) : []);

  return (
    <ul className={styles.coloredDots}>
      {list.map((item, index) => (
        <li
          key={index}
          className={styles.dot}
          style={{ backgroundColor: item.color }}
          title={item.letter || undefined}
        >
          {item.letter ? <span className={styles.letter}>{item.letter}</span> : null}
        </li>
      ))}
    </ul>
  );
};
