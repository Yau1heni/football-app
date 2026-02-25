import { Container } from 'components/container';
import { BurgerMenu } from 'components/header/components/burger-menu';
import { HeaderControls } from 'components/header/components/header-controls';
import { Navigation } from 'components/navigation';
import { LogoIcon } from 'components/ui/icons/logo-icon';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import type { FC } from 'react';
import { Link } from 'react-router';

import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerContent}>
          <Link to={routes.main.mask} className={styles.logo} aria-label="Логотип приложения">
            <LogoIcon />
            <Typography tag="h1" view="p-20" weight="bold">
              #iLoveThisGame
            </Typography>
          </Link>
          <div className={styles.desktopNav} aria-label="Основная навигация">
            <Navigation />
          </div>
          <div className={styles.desktopControls}>
            <HeaderControls />
          </div>
          <BurgerMenu>
            <Navigation variant="panel" />
            <div className={styles.burgerMenuControls}>
              <HeaderControls />
            </div>
          </BurgerMenu>
        </div>
      </Container>
    </header>
  );
};
