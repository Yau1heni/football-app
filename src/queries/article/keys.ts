export const getArticleQueryKeys = (articleId: string) => ['article', articleId];

export const getArticleUserReactionQueryKeys = (articleId: string, userId: string) =>
  ['article', articleId, 'reaction', userId] as const;

export const getArticleCommentsQueryKeys = (articleId: string) =>
  ['article', articleId, 'comments'] as const;
