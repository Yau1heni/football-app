import type { StateMessageVariant } from './state-message.tsx';

export const DEFAULT_TEXTS: Record<StateMessageVariant, { title: string; description?: string }> = {
  empty: {
    title: 'Ничего не найдено',
    description: 'Попробуйте изменить условия поиска или фильтры',
  },
  error: {
    title: 'Произошла ошибка',
    description: 'Попробуйте обновить страницу или повторить действие позже',
  },
};
