import { routes } from 'configs/routes.ts';
import { useAuthContext } from 'contexts/auth';
import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to={routes.login.mask} />;
};
