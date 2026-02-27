import { ColoredDots } from 'components/colored-dots';
import { Button } from 'components/ui/button';
import { ArrowRightIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router';

import styles from './page-title.module.scss';

type RecipeTitleProps = {
  title: string;
  teamColors?: string[];
};

export const PageTitle: FC<RecipeTitleProps> = (props) => {
  const { title, teamColors = [] } = props;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.pageTitle}>
      {pathname !== '/' && (
        <Button variant={'ghost'} onClick={() => navigate(-1)} className={styles.goBack}>
          <ArrowRightIcon
            width={32}
            height={32}
            viewBox="0 0 32 32"
            color={'accent'}
            aria-label={'вернуться назад'}
          />
        </Button>
      )}
      <Typography maxLines={2} weight={'bold'} className={styles.title}>
        {title}
      </Typography>
      {teamColors.length !== 0 && <ColoredDots colors={teamColors} />}
    </div>
  );
};
