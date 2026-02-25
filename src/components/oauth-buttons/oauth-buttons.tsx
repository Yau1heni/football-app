import { Button } from 'components/ui/button';
import { GithubIcon, GoogleIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';

import styles from './oauth-buttons.module.scss';

export type OAuthButtonsProps = {
  onGoogleClick: () => void | Promise<void>;
  onGithubClick: () => void | Promise<void>;
  disabled?: boolean;
};

export const OAuthButtons: FC<OAuthButtonsProps> = (props) => {
  const { onGoogleClick, onGithubClick, disabled = false } = props;

  return (
    <div className={styles.oAuthButtons} role="group" aria-label="Вход через соцсети">
      <Typography>или войти через</Typography>
      <div className={styles.buttons}>
        <Button
          variant={'ghost'}
          onClick={onGoogleClick}
          disabled={disabled}
          aria-label="Войти через Google"
        >
          <GoogleIcon />
          <Typography tag={'span'} className={styles.label}>
            Google
          </Typography>
        </Button>
        <Button
          variant={'ghost'}
          onClick={onGithubClick}
          disabled={disabled}
          aria-label="Войти через GitHub"
        >
          <GithubIcon />
          <Typography tag={'span'} className={styles.label}>
            GitHub
          </Typography>
        </Button>
      </div>
    </div>
  );
};
