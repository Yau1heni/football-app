import { AuthForms } from 'components/auth-forms';
import { Layout } from 'components/layout';
import { loginFormConfig } from 'configs/auth-forms-config.ts';
import { useLoginWithEmailMutation } from 'queries/auth';

export const Login = () => {
  const loginWithEmail = useLoginWithEmailMutation();

  return (
    <Layout>
      <AuthForms
        config={loginFormConfig}
        onSubmit={(values) =>
          loginWithEmail.mutate({
            email: values.email,
            password: values.password,
          })
        }
        isSubmitting={loginWithEmail.isPending}
        submitError={loginWithEmail.error}
      />
    </Layout>
  );
};
