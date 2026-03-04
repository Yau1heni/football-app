export const getArticleCommentsQueryKeys = (articleId: string) => ['articleComments', articleId];

export const getArticleCommentsReactionQueryKeys = (
  articleId: string,
  commentId: string,
  userId: string
) => ['articleCommentsReaction', { articleId, commentId, userId }];
