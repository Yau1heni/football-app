import { Loader } from 'components/ui/loader';
import { routes } from 'configs/routes.ts';
import { useAuthContext } from 'contexts/auth';
import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

import styles from './protected-route.module.scss';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to={routes.login.mask} />;
};
