import type { Timestamp } from 'firebase/firestore';

/**
 * Форматирует Firestore Timestamp в строку даты/времени по локали.
 * Возвращает пустую строку, если timestamp отсутствует или не имеет метода toDate.
 */
export const formatTimestamp = (timestamp: Timestamp | null | undefined): string => {
  if (timestamp == null) return '';
  const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : null;

  return date ? date.toLocaleString() : '';
};
