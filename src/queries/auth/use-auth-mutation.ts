import { useMutation } from '@tanstack/react-query';
import { authApi } from 'api/auth-api.ts';
import { routes } from 'configs/routes.ts';
import { useNavigate } from 'react-router';

export const useLoginWithEmailMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['loginWithEmail'],
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authApi.loginWithEmail(email, password);
    },
    onSuccess: () => navigate(routes.main.mask),
  });
};

export const useAuthWithGoogleMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['authWithGoogle'],
    mutationFn: () => authApi.withGoogle(),
    onSuccess: () => navigate(routes.main.mask),
  });
};

export const useAuthWithGithubMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['authWithGithub'],
    mutationFn: () => authApi.withGithub(),
    onSuccess: () => navigate(routes.main.mask),
  });
};
