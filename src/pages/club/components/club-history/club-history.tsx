import { ContentContainer } from 'components/content-container';
import { HtmlContent } from 'components/html-content';
import type { FC } from 'react';

import styles from './club-history.module.scss';

type ClubHistoryPropsType = {
  text: string;
};

export const ClubHistory: FC<ClubHistoryPropsType> = (props) => {
  const { text } = props;

  return (
    <ContentContainer title={'История'}>
      <div className={styles.clubHistory}>
        <HtmlContent html={text} />
      </div>
    </ContentContainer>
  );
};
