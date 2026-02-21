import { Container } from 'components/container';
import { Header } from 'components/header';
import type { FC, PropsWithChildren } from 'react';

import styles from './layout.module.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
};
