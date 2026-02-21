import { usePageMeta } from 'hooks/use-page-meta.ts';

export const NotFound = () => {
  usePageMeta({ title: 'Страница не найдена | #iLoveThisGame' });

  return <div>NotFound</div>;
};
