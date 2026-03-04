import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

export type DropdownOption = {
  /** Ключ варианта */
  key: string;
  /** Значение, отображаемое пользователю */
  value: string;
};

type UseDropdown = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSelect: (option: DropdownOption) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  selectedKey: string | null;
  options: DropdownOption[];
};

export const useDropdown = (
  options: DropdownOption[],
  value: DropdownOption | null,
  onChange: (value: DropdownOption | null) => void
): UseDropdown => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedKey = value?.key ?? null;

  const handleSelect = (option: DropdownOption) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return {
    open,
    setOpen,
    handleSelect,
    containerRef,
    selectedKey,
    options,
  };
};
