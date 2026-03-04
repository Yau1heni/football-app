import { useMutation } from '@tanstack/react-query';
import { authApi, type RegisterWithEmailParams } from 'api/auth-api.ts';
import { routes } from 'configs/routes.ts';
import { useNavigate } from 'react-router';

import { AUTH_MUTATION_KEYS } from './keys.ts';

export const useLoginWithEmailMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.LOGIN_WITH_EMAIL,
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return authApi.loginWithEmail(email, password);
    },
    onSuccess: () => navigate(routes.main.mask),
  });
};

export const useRegisterWithEmailMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.REGISTER_WITH_EMAIL,
    mutationFn: (data: RegisterWithEmailParams) => authApi.registerWithEmail(data),
    onSuccess: () => navigate(routes.main.mask),
  });
};

export const useAuthWithGoogleMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.AUTH_WITH_GOOGLE,
    mutationFn: () => authApi.withGoogle(),
    onSuccess: () => navigate(routes.main.mask),
  });
};

export const useAuthWithGithubMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: AUTH_MUTATION_KEYS.AUTH_WITH_GITHUB,
    mutationFn: () => authApi.withGithub(),
    onSuccess: () => navigate(routes.main.mask),
  });
};
