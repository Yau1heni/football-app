import { AuthContainer } from 'components/auth-container';
import { AuthFormField } from 'components/auth-form-field';
import { OAuthButtons } from 'components/oauth-buttons';
import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { useFormValidation } from 'hooks/use-form-validation';
import {
  useAuthWithGithubMutation,
  useAuthWithGoogleMutation,
  useRegisterWithEmailMutation,
} from 'queries/auth';
import { type FC, type SubmitEvent } from 'react';
import { Link } from 'react-router';
import { validateEmail, validatePassword, validateRequired } from 'utils/auth-validation';

import styles from './register-forms.module.scss';

const AUTH_SECTION_TITLE_ID = 'register-page-title';

export const RegisterForms: FC = () => {
  const { values, validateAll, getFieldProps, isValid } = useFormValidation(
    { displayName: '', email: '', password: '' },
    {
      displayName: validateRequired,
      email: validateEmail,
      password: validatePassword,
    }
  );

  const registerWithEmail = useRegisterWithEmailMutation();
  const registerWithGoogle = useAuthWithGoogleMutation();
  const registerWithGithub = useAuthWithGithubMutation();

  const isLoading =
    registerWithEmail.isPending || registerWithGoogle.isPending || registerWithGithub.isPending;

  const error = registerWithEmail.error || registerWithGoogle.error || registerWithGithub.error;
  const isError = Boolean(error);

  const handleRegister = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;

    registerWithEmail.mutate(values);
  };

  return (
    <AuthContainer title="Зарегистрироваться" titleId={AUTH_SECTION_TITLE_ID}>
      <form
        className={styles.form}
        onSubmit={handleRegister}
        aria-labelledby={AUTH_SECTION_TITLE_ID}
        noValidate
      >
        <AuthFormField
          fieldProps={getFieldProps('displayName')}
          label="Имя"
          placeholder="Как к вам обращаться"
          type="text"
          autoComplete="name"
        />
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
          placeholder="Не менее 5 символов"
          type="password"
          autoComplete="new-password"
        />
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || isLoading}
          loading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>
      <OAuthButtons
        onGoogleClick={registerWithGoogle.mutate}
        onGithubClick={registerWithGithub.mutate}
        disabled={isLoading}
      />
      {isError && (
        <div role="alert">
          <Typography view="p-16" color="error">
            Не удалось зарегистрироваться. Попробуйте ещё раз.
          </Typography>
        </div>
      )}
      <div className={styles.linkWrapper}>
        <Link to={routes.login.mask} aria-describedby={AUTH_SECTION_TITLE_ID}>
          <Typography>Войти</Typography>
        </Link>
      </div>
    </AuthContainer>
  );
};
