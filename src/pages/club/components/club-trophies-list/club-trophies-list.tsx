import { ContentContainer } from 'components/content-container';
import type { FC } from 'react';

import styles from './club-trophies-list.module.scss';
import { ClubTrophyItem } from './club-trophy-item/club-trophy-item.tsx';

type ClubTrophiesListPropsType = {
  trophies: {
    name: string;
    count: number;
  }[];
};

export const ClubTrophiesList: FC<ClubTrophiesListPropsType> = (props) => {
  const { trophies } = props;

  if (trophies.length === 0) return null;

  return (
    <ContentContainer title={'Трофеи'}>
      <ul className={styles.clubTrophiesList}>
        {trophies.map((trophy, i) => (
          <ClubTrophyItem key={i} trophy={trophy} />
        ))}
      </ul>
    </ContentContainer>
  );
};
