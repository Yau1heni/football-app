import { Typography } from 'components/ui/typography';
import type { FC, ReactNode } from 'react';

import styles from './content-container.module.scss';

type ClubContentCardProps = {
  children: ReactNode;
  title: string;
  image?: string;
};

export const ContentContainer: FC<ClubContentCardProps> = ({ children, title, image }) => {
  return (
    <section className={styles.contentContainer}>
      <div className={styles.contentHeader}>
        <div>
          <Typography className={styles.sectionTitle} maxLines={2} view="sectionTitle">
            {title}
          </Typography>
        </div>
        {image && <img src={image} alt={'emblem'} width={100} />}
      </div>
      {children}
    </section>
  );
};
