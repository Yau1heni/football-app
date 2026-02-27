import { ARTICLES_COLLECTIONS } from 'constants/firebase-collections.ts';
import { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import { db } from 'configs/firebase-config.ts';
import type { QueryDocumentSnapshot, QueryConstraint } from 'firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import type { Article } from 'types/articles.type.ts';
import { articlesFirestoreConverter } from 'utils/firebase-converter.ts';

const ARTICLES_PATH = ARTICLES_COLLECTIONS.PATH;
export const ARTICLES_PAGE_SIZE = 5;

export type GetArticlesResult = {
  articles: Article[];
  lastDoc: QueryDocumentSnapshot<Article> | null;
  hasMore: boolean;
};

export const articlesApi = {
  async getAll(
    pageSize: number = ARTICLES_PAGE_SIZE,
    startAfterDoc?: QueryDocumentSnapshot<Article> | null
  ): Promise<GetArticlesResult> {
    const articlesRef = collection(db, ARTICLES_PATH).withConverter(articlesFirestoreConverter);

    const queryConstraints: QueryConstraint[] = [
      orderBy(ARTICLES_COLLECTIONS.FIELD_PATH.TIMESTAMP, SORT_DIRECTIONS.DESC),
      limit(pageSize),
    ];
    if (startAfterDoc) {
      queryConstraints.push(startAfter(startAfterDoc));
    }
    const q = query(articlesRef, ...queryConstraints);

    const snapshot = await getDocs(q);

    const articles = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
    const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;
    const hasMore = snapshot.docs.length === pageSize;

    return { articles, lastDoc, hasMore };
  },

  async getById(articleId: string): Promise<Article | null> {
    const articleRef = doc(db, ARTICLES_PATH, articleId).withConverter(articlesFirestoreConverter);
    const snapshot = await getDoc(articleRef);
    if (!snapshot.exists()) return null;

    return { ...snapshot.data(), id: snapshot.id };
  },
};
