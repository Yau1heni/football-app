import { KEYBOARD } from 'constants/keyboard.ts';

import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

const APP_ROOT_ID = 'root';

export type UseBurgerMenuReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

export const useBurgerMenu = (): UseBurgerMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === KEYBOARD.ESC) close();
    };
    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, close]);

  // Контент под меню не фокусируется, inert скрывает #root из tab-порядка
  useEffect(() => {
    if (!isOpen) return;
    const root = document.getElementById(APP_ROOT_ID);
    const triggerElement = triggerRef.current;
    root?.setAttribute('inert', '');

    return () => {
      root?.removeAttribute('inert');
      if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle, triggerRef };
};
