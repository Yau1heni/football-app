export const getArticleQueryKeys = (articleId: string) => ['article', articleId];

export const getArticleUserReactionQueryKeys = (articleId: string, userId: string) => [
  'articleUserReaction',
  { articleId, userId },
];

export const getArticleCommentsQueryKeys = (articleId: string) => ['articleComments', articleId];

export const getArticleCommentsReactionQueryKeys = (
  articleId: string,
  commentId: string,
  userId: string
) => ['articleCommentsReaction', { articleId, commentId, userId }];
