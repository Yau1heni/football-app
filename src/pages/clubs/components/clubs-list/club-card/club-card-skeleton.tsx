import { CardSkeleton } from 'components/ui/card';

import styles from './club-card.module.scss';

export const ClubCardSkeleton = () => {
  return (
    <div className={styles.clubCard}>
      <CardSkeleton isWithAction={true} />
    </div>
  );
};
