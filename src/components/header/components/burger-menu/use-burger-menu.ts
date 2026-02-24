import { KEYBOARD } from 'constants/keyboard.ts';

import { useCallback, useEffect } from 'react';
import { useState } from 'react';

export type UseBurgerMenuReturn = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function useBurgerMenu(): UseBurgerMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

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

  return { isOpen, open, close, toggle };
}
