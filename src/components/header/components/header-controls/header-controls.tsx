import { authApi } from 'api/auth-api.ts';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { useAuthContext } from 'contexts/auth';
import type { FC } from 'react';
import { useNavigate } from 'react-router';

export const HeaderControls: FC = () => {
  const { user, isLoading: isUserLoading, isAuthenticated } = useAuthContext();
  const username = user?.displayName;

  const navigate = useNavigate();
  const safeUsername = username === null ? 'unknown' : username;

  const handleLogout = async () => {
    await authApi.logOut();
  };

  return (
    <>
      {isUserLoading ? (
        <Skeleton variant="text" width={80} height={20} />
      ) : (
        <Typography>{safeUsername}</Typography>
      )}
      {isAuthenticated ? (
        <Button loading={isUserLoading} onClick={handleLogout}>
          Выйти
        </Button>
      ) : (
        <Button loading={isUserLoading} onClick={() => navigate(routes.login.mask)}>
          Войти
        </Button>
      )}
    </>
  );
};
