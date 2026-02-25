import { routes } from 'configs/routes.ts';
import { useAuth } from 'hooks/use-auth-state.ts';
import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to={routes.login.mask} />;
};
