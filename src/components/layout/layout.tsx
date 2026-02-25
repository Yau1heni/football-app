import { Container } from 'components/container';
import { Header } from 'components/header';
import { useAuth } from 'hooks/use-auth-state.ts';
import type { FC, PropsWithChildren } from 'react';

import styles from './layout.module.scss';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  return (
    <div className={styles.layout}>
      <Header
        username={user?.displayName}
        isUserLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />
      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
};
