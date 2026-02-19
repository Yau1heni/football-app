import { CupIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';

import styles from './club-trophy-item.module.scss';

type ClubTrophyItemPropsType = {
  trophy: {
    name: string;
    count: number;
  };
};

export const ClubTrophyItem: FC<ClubTrophyItemPropsType> = (props) => {
  const { trophy } = props;

  return (
    <li className={styles.clubTrophyItem}>
      <Typography className={styles.trophyName} tag="span">
        {trophy.name}
      </Typography>
      <div className={styles.trophy}>
        <Typography className={styles.trophyCount} weight={'bold'} color={'accent'}>
          {trophy.count}
        </Typography>
        <CupIcon />
      </div>
    </li>
  );
};
