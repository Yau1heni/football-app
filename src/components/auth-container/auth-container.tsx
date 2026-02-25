import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import { type PropsWithChildren } from 'react';

import styles from './auth-container.module.scss';

type AuthContainerProps = {
  title: string;
  /** Уникальный id для заголовка (для aria-labelledby) */
  titleId?: string;
} & PropsWithChildren;

export const AuthContainer: FC<AuthContainerProps> = ({ children, title, titleId }) => {
  return (
    <section className={styles.authContainer} aria-labelledby={titleId}>
      <Typography id={titleId} tag="h1" className={styles.title} color="accent" view="p-20">
        {title}
      </Typography>
      {children}
    </section>
  );
};
