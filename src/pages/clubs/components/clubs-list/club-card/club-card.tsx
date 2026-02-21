import { DEFAULT_CLUB_IMAGE } from 'constants/images.ts';

import { HtmlContent } from 'components/html-content';
import { Card } from 'components/ui/card';
import { Typography } from 'components/ui/typography';
import { routes } from 'configs/routes.ts';
import type { FC } from 'react';
import { Link } from 'react-router';
import type { Club } from 'types/clubs.types.ts';

type ClubCardProps = {
  club: Club;
  isFavorite?: boolean;
};

export const ClubCard: FC<ClubCardProps> = (props) => {
  const { club, isFavorite = false } = props;

  return (
    <Link key={club.id} to={routes.club.create(club.id)}>
      <Card
        title={club.name}
        image={club.logo || DEFAULT_CLUB_IMAGE}
        subtitle={club.country}
        statusSlot={
          isFavorite && (
            <Typography tag={'span'} aria-label="В избранном">
              В избранном
            </Typography>
          )
        }
        captionSlot={
          <Typography tag={'div'} maxLines={3}>
            <HtmlContent html={club.history} />
          </Typography>
        }
      />
    </Link>
  );
};
