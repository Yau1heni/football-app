import { Layout } from 'components/layout';
import { type FC } from 'react';

import { RegisterForms } from './components/register-forms';

export const Register: FC = () => {
  return (
    <Layout>
      <RegisterForms />
    </Layout>
  );
};
