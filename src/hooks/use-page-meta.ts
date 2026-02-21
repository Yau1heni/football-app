import { useEffect } from 'react';
import { resetPageMeta, setPageMeta, type PageMetaOptions } from 'utils/set-page-meta.ts';

export const usePageMeta = (options: PageMetaOptions): void => {
  const { title, description } = options;

  useEffect(() => {
    setPageMeta({ title, description });

    return () => {
      resetPageMeta();
    };
  }, [title, description]);
};
