import { DEFAULT_CLUB_IMAGE } from 'constants/images.ts';

import { HtmlContent } from 'components/html-content';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import { type FC, memo, type MouseEvent } from 'react';
import { Link } from 'react-router';
import type { Club } from 'types/clubs.types.ts';

import styles from './club-card.module.scss';

type ClubCardProps = {
  club: Club;
  isFavorite?: boolean;
  onToggleFavorite?: (clubId: string, isCurrentlyFavorite: boolean) => void;
  isToggleLoading?: boolean;
};

export const ClubCard: FC<ClubCardProps> = memo((props) => {
  const { club, isFavorite = false, onToggleFavorite, isToggleLoading = false } = props;

  const handleToggleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(club.id, isFavorite);
  };

  return (
    <Link className={styles.clubCard} key={club.id} to={routes.club.create(club.id)}>
      <Card
        title={club.name}
        image={club.logo || DEFAULT_CLUB_IMAGE}
        subtitle={club.country}
        statusSlot={
          isFavorite && (
            <Typography tag={'span'} color={'light'} aria-label="В избранном">
              В избранном
            </Typography>
          )
        }
        captionSlot={
          <Typography tag={'div'} maxLines={3}>
            <HtmlContent html={club.history} />
          </Typography>
        }
        actionSlot={
          <Button
            className={styles.actionSlot}
            onClick={handleToggleClick}
            loading={isToggleLoading}
          >
            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </Button>
        }
      />
    </Link>
  );
});
