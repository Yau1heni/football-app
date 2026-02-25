import { AuthContainer } from 'components/auth-container';
import { AuthFormField } from 'components/auth-form-field';
import { OAuthButtons } from 'components/oauth-buttons';
import { Button } from 'components/ui/button';
import { Typography } from 'components/ui/typography';
import type { AuthFormConfig } from 'configs/auth-forms-config.ts';
import { useFormValidation } from 'hooks/use-form-validation';
import { useAuthWithGithubMutation, useAuthWithGoogleMutation } from 'queries/auth';
import { type FC, type SubmitEvent } from 'react';
import { Link } from 'react-router';

import styles from './auth-forms.module.scss';

type AuthFormsProps = {
  config: AuthFormConfig;
  onSubmit: (values: Record<string, string>) => void;
  isSubmitting?: boolean;
  submitError?: Error | null;
};

export const AuthForms: FC<AuthFormsProps> = (props) => {
  const { config, onSubmit, isSubmitting = false, submitError = null } = props;

  const { values, validateAll, getFieldProps, isValid } = useFormValidation(
    config.initialValues,
    config.validators
  );

  const authWithGoogle = useAuthWithGoogleMutation();
  const authWithGithub = useAuthWithGithubMutation();

  const isLoading = isSubmitting || authWithGoogle.isPending || authWithGithub.isPending;
  const isError = Boolean(submitError || authWithGoogle.error || authWithGithub.error);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;
    onSubmit(values);
  };

  return (
    <AuthContainer title={config.title} titleId={config.titleId}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        aria-labelledby={config.titleId}
        noValidate
      >
        {config.fields.map((field) => (
          <AuthFormField
            key={field.name}
            fieldProps={getFieldProps(field.name)}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            autoComplete={field.autoComplete}
          />
        ))}
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!isValid || isLoading}
          loading={isLoading}
        >
          {config.submitLabel}
        </Button>
      </form>
      <OAuthButtons
        onGoogleClick={authWithGoogle.mutate}
        onGithubClick={authWithGithub.mutate}
        disabled={isLoading}
      />
      {isError && (
        <div role="alert">
          <Typography view="p-16" color="error">
            {config.errorMessage}
          </Typography>
        </div>
      )}
      <div className={styles.linkWrapper}>
        <Link to={config.linkTo} aria-describedby={config.titleId}>
          <Typography>{config.linkText}</Typography>
        </Link>
      </div>
    </AuthContainer>
  );
};
