import cn from 'classnames';
import { Typography } from 'components/ui/typography';
import { navigationConfig } from 'configs/navigation-config.ts';
import { type FC } from 'react';
import { Link, useLocation } from 'react-router';

import styles from './navigation.module.scss';

export type NavigationProps = {
  className?: string;
};

export const Navigation: FC<NavigationProps> = ({ className }) => {
  const { pathname } = useLocation();

  const finallyClassName = cn(styles.navigation, className);

  const navList = navigationConfig.map(({ title, to }, i) => {
    return (
      <Link to={to} key={i}>
        <Typography color={pathname === to ? 'accent' : 'primary'} view={'p-16'}>
          {title}
        </Typography>
      </Link>
    );
  });

  return <nav className={finallyClassName}>{navList}</nav>;
};
