import cn from 'classnames';
import { EmptyIcon, ErrorIcon } from 'components/ui/icons';
import { Typography } from 'components/ui/typography';
import type { FC, ReactNode } from 'react';

import { DEFAULT_TEXTS } from './state-message-constant.ts';
import styles from './state-message.module.scss';

export type StateMessageVariant = 'empty' | 'error';

export type StateMessageProps = {
  /** Вариант: пустой результат или ошибка */
  variant: StateMessageVariant;
  /** Заголовок (если не передан — используется текст по умолчанию для варианта) */
  title?: string;
  /** Дополнительное описание */
  description?: string;
  /** Кнопка или другое действие (например «Повторить», «Сбросить фильтры») */
  action?: ReactNode;
  /** Дополнительный класс контейнера */
  className?: string;
};

export const StateMessage: FC<StateMessageProps> = (props) => {
  const { variant, title, description, action, className } = props;

  const defaults = DEFAULT_TEXTS[variant];

  const finalTitle = title ?? defaults.title;
  const finalDescription = description ?? defaults.description;

  const icon = variant === 'error' ? <ErrorIcon /> : <EmptyIcon />;

  return (
    <div
      className={cn(styles.root, styles[variant], className)}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <div className={styles.icon}>{icon}</div>
      <Typography tag="h2" view="sectionTitle" weight="bold" className={styles.title}>
        {finalTitle}
      </Typography>
      {finalDescription && (
        <Typography view="p-16" color="secondary" className={styles.description}>
          {finalDescription}
        </Typography>
      )}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};
