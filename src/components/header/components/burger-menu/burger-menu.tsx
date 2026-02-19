import { Button } from 'components/ui/button';
import { CloseIcon } from 'components/ui/icons';
import type { FC, ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';

import styles from './burger-menu.module.scss';
import { useBurgerMenu } from './use-burger-menu.ts';

type BurgerMenuProps = {
  /** Содержимое панели (навигация и контролы) */
  children: ReactNode;
};

export const BurgerMenu: FC<BurgerMenuProps> = ({ children }) => {
  const { isOpen, close, toggle } = useBurgerMenu();

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) close();
  };

  const panel = (
    <>
      <div
        className={styles.overlay}
        data-visible={isOpen || undefined}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        className={styles.panel}
        data-visible={isOpen || undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Меню навигации"
      >
        <div className={styles.panelHeader}>
          <Button
            type="button"
            variant="ghost"
            className={styles.closeButton}
            onClick={close}
            aria-label="Закрыть меню"
          >
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.panelBody}>{children}</div>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className={styles.burgerButton}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        <span className={styles.line} />
        <span className={styles.line} />
        <span className={styles.line} />
      </button>
      {typeof document !== 'undefined' && createPortal(panel, document.body)}
    </>
  );
};
