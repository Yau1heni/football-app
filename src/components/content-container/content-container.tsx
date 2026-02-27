import { Skeleton } from 'components/ui/skeleton';
import { Typography } from 'components/ui/typography';
import type { FC, ReactNode } from 'react';

import styles from './content-container.module.scss';

type ClubContentCardProps = {
  children: ReactNode;
  title?: string;
  isSkeleton?: boolean;
  image?: string;
};

export const ContentContainer: FC<ClubContentCardProps> = (props) => {
  const { children, title, image, isSkeleton } = props;

  return (
    <section className={styles.contentContainer}>
      <div className={styles.contentHeader}>
        <div>
          {isSkeleton ? (
            <Skeleton variant="text" width={200} height={32} />
          ) : (
            <Typography className={styles.sectionTitle} maxLines={2} view="sectionTitle">
              {title}
            </Typography>
          )}
        </div>
        {image && <img src={image} alt={'emblem'} width={100} />}
      </div>
      {children}
    </section>
  );
};
