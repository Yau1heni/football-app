import { AuthForms } from 'components/auth-forms';
import { Layout } from 'components/layout';
import { registerFormConfig } from 'configs/auth-forms-config.ts';
import { useRegisterWithEmailMutation } from 'queries/auth';
import { type FC } from 'react';

export const Register: FC = () => {
  const registerWithEmail = useRegisterWithEmailMutation();

  return (
    <Layout>
      <AuthForms
        config={registerFormConfig}
        onSubmit={(values) =>
          registerWithEmail.mutate({
            displayName: values.displayName,
            email: values.email,
            password: values.password,
          })
        }
        isSubmitting={registerWithEmail.isPending}
        submitError={registerWithEmail.error}
      />
    </Layout>
  );
};
