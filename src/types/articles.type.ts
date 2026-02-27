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
