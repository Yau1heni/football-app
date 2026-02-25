import { AuthContainer } from 'components/auth-container';
import { AuthFormField } from 'components/auth-form-field';
import { OAuthButtons } from 'components/oauth-buttons';
import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { useFormValidation } from 'hooks/use-form-validation';
import {
  useLoginWithEmailMutation,
  useAuthWithGithubMutation,
  useAuthWithGoogleMutation,
} from 'queries/auth';
import { type FC, type SubmitEvent } from 'react';
import { Link } from 'react-router';
import { validateEmail, validatePassword } from 'utils/auth-validation.ts';

import styles from './login-forms.module.scss';

const AUTH_SECTION_TITLE_ID = 'login-page-title';

export const LoginForms: FC = () => {
  const { values, validateAll, getFieldProps, isValid } = useFormValidation(
    { email: '', password: '' },
    { email: validateEmail, password: validatePassword }
  );

  const loginWithEmail = useLoginWithEmailMutation();
  const loginWithGoogle = useAuthWithGoogleMutation();
  const loginWithGithub = useAuthWithGithubMutation();

  const isLoading =
    loginWithEmail.isPending || loginWithGoogle.isPending || loginWithGithub.isPending;

  const error = loginWithEmail.error || loginWithGoogle.error || loginWithGithub.error;
  const isError = Boolean(error);

  const handleLogin = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;

    loginWithEmail.mutate(values);
  };

  return (
    <AuthContainer title="Войти" titleId={AUTH_SECTION_TITLE_ID}>
      <form
        onSubmit={handleLogin}
        className={styles.form}
        aria-labelledby={AUTH_SECTION_TITLE_ID}
        noValidate
      >
        <AuthFormField
          fieldProps={getFieldProps('email')}
          label="Email"
          placeholder="example@mail.com"
          type="email"
          autoComplete="email"
        />
        <AuthFormField
          fieldProps={getFieldProps('password')}
          label="Пароль"
          placeholder="Введите пароль"
          type="password"
          autoComplete="current-password"
        />
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || isLoading}
          loading={isLoading}
        >
          Войти
        </Button>
      </form>
      <OAuthButtons
        onGoogleClick={loginWithGoogle.mutate}
        onGithubClick={loginWithGithub.mutate}
        disabled={isLoading}
      />
      {isError && (
        <div role="alert">
          <Typography view="p-16" color="error">
            Не удалось выполнить вход. Попробуйте ещё раз.
          </Typography>
        </div>
      )}
      <div className={styles.linkWrapper}>
        <Link to={routes.register.mask} aria-describedby={AUTH_SECTION_TITLE_ID}>
          <Typography>Зарегистрироваться</Typography>
        </Link>
      </div>
    </AuthContainer>
  );
};
