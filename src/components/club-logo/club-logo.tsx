import { DEFAULT_CLUB_IMAGE } from 'constants/images.ts';

import cn from 'classnames';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';

import styles from './club-logo.module.scss';

type ClubLogoPropsType = {
  logo: string | null;
  isFavorite?: boolean;
  size?: 's' | 'm';
  className?: string;
};

export const ClubLogo: FC<ClubLogoPropsType> = (props) => {
  const { logo, isFavorite = false, size = 'm', className } = props;

  return (
    <div
      className={cn(
        styles.clubLogo,
        size === 's' ? styles.clubLogoSizeS : styles.clubLogoSizeM,
        className
      )}
    >
      <img className={styles.image} src={logo || DEFAULT_CLUB_IMAGE} alt="club logo" />
      {isFavorite && (
        <Typography tag={'span'} className={styles.favoriteBadge} aria-label="В избранном">
          В избранном
        </Typography>
      )}
    </div>
  );
};
