import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import { Link } from 'react-router';
import type { SocialIconType } from 'types/clubs.types.ts';
import { getSocialIcon } from 'utils/get-social-icon.ts';

import styles from './social-links.module.scss';

type SocialLinksPropsType = {
  socials: SocialIconType[];
};

export const SocialLinks: FC<SocialLinksPropsType> = ({ socials }) => {
  if (socials.length === 0) return null;

  return (
    <div className={styles.socialLinks}>
      {socials.map(({ name, link }) => {
        const Icon = getSocialIcon(name);

        return (
          <Link
            key={name}
            to={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <Icon width={24} height={24} />
            <Typography className={styles.socialName}>{name}</Typography>
          </Link>
        );
      })}
    </div>
  );
};
