export const getArticleQueryKeys = (articleId: string) => ['article', articleId];

export const getArticleUserReactionQueryKeys = (articleId: string, userId: string) => [
  'articleUserReaction',
  { articleId, userId },
];
