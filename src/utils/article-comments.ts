import type { ArticleComment } from 'types/articles.type.ts';

/** Элемент плоского списка для отрисовки: комментарий и его глубина вложенности (0 = корневой). */
export type CommentDisplayItem = {
  comment: ArticleComment;
  depth: number;
};

const DEFAULT_MAX_DEPTH = 5;

/**
 * Строит из плоского списка комментариев (с parentCommentId) плоский же список
 * для отрисовки с учётом вложенности: каждый элемент содержит комментарий и
 * глубину (0..maxDepth). Глубина ограничена maxDepth, чтобы не уходить вправо
 * при отрисовке отступами.
 *
 * Алгоритм:
 * 1) Группируем комментарии по parentCommentId (корни — где null).
 * 2) Сортируем корни и каждую группу ответов по времени (новые сверху).
 * 3) Обходим дерево в порядке «корень → ответы» (pre-order), присваиваем depth,
 *    не идём глубже maxDepth.
 *
 * @param comments — плоский список комментариев из API (например, Firestore).
 * @param maxDepth — максимальная глубина вложенности (по умолчанию 5).
 * @returns Плоский массив { comment, depth } в порядке отрисовки.
 */
export const buildCommentsDisplayList = (
  comments: ArticleComment[],
  maxDepth: number = DEFAULT_MAX_DEPTH
): CommentDisplayItem[] => {
  if (comments.length === 0) return [];

  const byParent = new Map<string | null, ArticleComment[]>();

  comments.forEach((c) => {
    const parentId = c.parentCommentId ?? null;
    const list = byParent.get(parentId) ?? [];
    list.push(c);
    byParent.set(parentId, list);
  });

  const sortByTimestampDesc = (a: ArticleComment, b: ArticleComment) =>
    b.timestamp.toMillis() - a.timestamp.toMillis();

  byParent.forEach((list) => list.sort(sortByTimestampDesc));

  const result: CommentDisplayItem[] = [];

  const traverse = (parentId: string | null, depth: number) => {
    const children = byParent.get(parentId) ?? [];
    children.forEach((comment) => {
      result.push({ comment, depth });
      if (depth < maxDepth) {
        traverse(comment.id, depth + 1);
      }
    });
  };

  traverse(null, 0);
  return result;
};
