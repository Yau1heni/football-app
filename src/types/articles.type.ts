import type { Timestamp } from 'firebase/firestore';

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImageUrl: string;
  timestamp: Timestamp;
  likesCount: number;
  dislikesCount: number;
  viewsCount: number;
  commentsCount: number;
};

export const REACTION = {
  LIKE: 'like',
  DISLIKE: 'dislike',
} as const;

export type ReactionType = (typeof REACTION)[keyof typeof REACTION];

export type Reaction = {
  userId: string;
  timestamp: Timestamp;
  type: ReactionType;
};

export type ArticleComment = {
  id: string;
  userId: string | null;
  name: string | null;
  text: string | null;
  parentCommentId: string | null;
  timestamp: Timestamp;
  likesCount: number;
  dislikesCount: number;
};
