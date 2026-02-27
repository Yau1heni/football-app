import cn from 'classnames';
import { Button } from 'components/ui/button';
import { DislikeIcon, LikeIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC } from 'react';
import { REACTION, type ReactionType } from 'types/articles.type.ts';

import styles from './reaction-buttons.module.scss';

export type ReactionButtonsSize = 's' | 'm';

export type ReactionButtonsProps = {
  likesCount: number;
  dislikesCount: number;
  userReaction: ReactionType | null;
  onLike: () => void;
  onDislike: () => void;
  size?: ReactionButtonsSize;
  className?: string;
  disabled?: boolean;
};

const iconSizeMap = { s: 16, m: 20 } as const;

export const ReactionButtons: FC<ReactionButtonsProps> = (props) => {
  const {
    likesCount,
    dislikesCount,
    userReaction,
    onLike,
    onDislike,
    size = 'm',
    className,
    disabled = false,
  } = props;

  const iconSize = iconSizeMap[size];

  return (
    <div className={cn(styles.root, size === 's' ? styles.rootSizeS : styles.rootSizeM, className)}>
      <Button
        variant={'ghost'}
        className={cn(styles.trigger, userReaction === REACTION.LIKE && styles.triggerActive)}
        onClick={onLike}
        aria-label="Лайк"
        disabled={disabled}
      >
        <LikeIcon
          width={iconSize}
          height={iconSize}
          className={cn(styles.icon, userReaction === REACTION.LIKE && styles.iconFilled)}
        />
        <Typography tag={'span'} className={styles.count}>
          {likesCount}
        </Typography>
      </Button>
      <Button
        variant={'ghost'}
        className={cn(styles.trigger, userReaction === REACTION.DISLIKE && styles.triggerActive)}
        onClick={onDislike}
        aria-label="Дизлайк"
        disabled={disabled}
      >
        <DislikeIcon
          width={iconSize}
          height={iconSize}
          className={cn(styles.icon, userReaction === REACTION.DISLIKE && styles.iconFilled)}
        />
        <Typography tag={'span'} className={styles.count}>
          {dislikesCount}
        </Typography>
      </Button>
    </div>
  );
};
