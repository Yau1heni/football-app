import cn from 'classnames';
import { Typography } from 'components/ui/typography';
import { type FC, type MouseEventHandler, type ReactNode } from 'react';

import styles from './card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  captionSlot?: ReactNode;
  /** Заголовок карточки */
  title: ReactNode;
  /** Описание карточки */
  subtitle: ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: ReactNode;
  /** Слот для отображения статуа */
  statusSlot?: ReactNode;
  /** Клик на карточку */
  onClick?: MouseEventHandler;
  /** Слот для действия */
  actionSlot?: ReactNode;
};

export const Card: FC<CardProps> = (props) => {
  const {
    className,
    image,
    title,
    subtitle,
    actionSlot,
    contentSlot,
    captionSlot,
    statusSlot,
    onClick,
  } = props;

  const finallyClassName = cn(styles.card, className);

  return (
    <div onClick={onClick} className={finallyClassName}>
      <div className={styles.image}>
        {statusSlot && <div className={styles.statusSlot}>{statusSlot}</div>}
        <img src={image} alt={'card image'} loading={'lazy'} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.content}>
          {captionSlot && <div className={styles.captionSlot}>{captionSlot}</div>}
          <Typography weight={'bold'} view={'p-20'} maxLines={2}>
            {title}
          </Typography>
          <Typography className={styles.subTitle} maxLines={3}>
            {subtitle}
          </Typography>
        </div>
        <div className={styles.footer}>
          <div className={styles.contentSlot}>{contentSlot}</div>
          {actionSlot}
        </div>
      </div>
    </div>
  );
};
