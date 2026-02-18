import type { RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';

import type { Option } from './multi-dropdown.tsx';

type UseMultiDropdown = {
  open: boolean;
  setOpen: (open: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
  filteredOptions: Option[];
  handleSelect: (option: Option) => void;
  containerRef: RefObject<HTMLDivElement | null>;
  selectedKeys: Set<string>;
};

export const useMultiDropdown = (
  options: Option[],
  value: Option[],
  onChange: (value: Option[]) => void
): UseMultiDropdown => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedKeys = new Set(value.map((v) => v.key));

  const filteredOptions = options.filter((opt) =>
    opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    if (selectedKeys.has(option.key)) {
      onChange(value.filter((v) => v.key !== option.key));
    } else {
      onChange([...value, option]);
    }
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
    search,
    setSearch,
    filteredOptions,
    handleSelect,
    containerRef,
    selectedKeys,
  };
};
