import { ARTICLES_COLLECTIONS } from 'constants/firebase-collections.ts';
import { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import { reactionsApi } from 'api/reactions-api.ts';
import { db } from 'configs/firebase-config.ts';
import {
  type QueryDocumentSnapshot,
  type QueryConstraint,
  setDoc,
  serverTimestamp,
  increment,
  writeBatch,
} from 'firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore';
import type { Article, ArticleComment, Reaction, ReactionType } from 'types/articles.types.ts';
import {
  articlesFirestoreConverter,
  commentsFirestoreConverter,
  userReactionByIdFirestoreConverter,
} from 'utils/firebase-converter.ts';

const ARTICLES_PATH = ARTICLES_COLLECTIONS.PATH;
const REACTIONS_PATH = ARTICLES_COLLECTIONS.SUBCOLLECTIONS.REACTIONS;
const COMMENTS_PATH = ARTICLES_COLLECTIONS.SUBCOLLECTIONS.COMMENTS;

export const ARTICLES_PAGE_SIZE = 5;

export type GetArticlesResult = {
  articles: Article[];
  lastDoc: QueryDocumentSnapshot<Article> | null;
  hasMore: boolean;
};

export const articlesApi = {
  getAll: async (
    pageSize: number = ARTICLES_PAGE_SIZE,
    startAfterDoc?: QueryDocumentSnapshot<Article> | null
  ): Promise<GetArticlesResult> => {
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

  getById: async (articleId: string): Promise<Article | null> => {
    const articleRef = doc(db, ARTICLES_PATH, articleId).withConverter(articlesFirestoreConverter);
    const snapshot = await getDoc(articleRef);
    if (!snapshot.exists()) return null;

    return { ...snapshot.data(), id: snapshot.id };
  },

  getUserReactionById: async (articleId: string, userId: string): Promise<Reaction | null> => {
    const reactionRef = doc(db, ARTICLES_PATH, articleId, REACTIONS_PATH, userId).withConverter(
      userReactionByIdFirestoreConverter
    );

    return reactionsApi.getUserReaction<Reaction>({ reactionRef });
  },

  setUserReaction: async (articleId: string, userId: string, type: ReactionType): Promise<void> => {
    await reactionsApi.setUserReaction({
      reactionRef: doc(db, ARTICLES_PATH, articleId, REACTIONS_PATH, userId),
      parentRef: doc(db, ARTICLES_PATH, articleId),
      type,
    });
  },

  getUserReactionByCommentId: async (
    articleId: string,
    commentId: string,
    userId: string
  ): Promise<Reaction | null> => {
    const reactionRef = doc(
      db,
      ARTICLES_PATH,
      articleId,
      COMMENTS_PATH,
      commentId,
      REACTIONS_PATH,
      userId
    ).withConverter(userReactionByIdFirestoreConverter);

    return reactionsApi.getUserReaction<Reaction>({ reactionRef });
  },

  setUserCommentReaction: async (
    articleId: string,
    userId: string,
    commentId: string,
    type: ReactionType
  ): Promise<void> => {
    await reactionsApi.setUserReaction({
      reactionRef: doc(
        db,
        ARTICLES_PATH,
        articleId,
        COMMENTS_PATH,
        commentId,
        REACTIONS_PATH,
        userId
      ),
      parentRef: doc(db, ARTICLES_PATH, articleId, COMMENTS_PATH, commentId),
      type,
    });
  },

  getComments: async (articleId: string): Promise<ArticleComment[] | null> => {
    const commentsRef = collection(db, ARTICLES_PATH, articleId, COMMENTS_PATH);
    const convertedData = commentsRef.withConverter(commentsFirestoreConverter);
    const q = query(
      convertedData,
      orderBy(ARTICLES_COLLECTIONS.FIELD_PATH.TIMESTAMP, SORT_DIRECTIONS.DESC)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));
  },

  async addComment(
    articleId: string,
    data: { userId: string; text: string; parentCommentId?: string | null; name: string }
  ): Promise<string> {
    const commentsRef = collection(db, ARTICLES_PATH, articleId, COMMENTS_PATH);
    const newCommentRef = doc(commentsRef);
    const articleRef = doc(db, ARTICLES_PATH, articleId);

    await setDoc(newCommentRef, {
      userId: data.userId,
      name: data.name,
      text: data.text,
      parentCommentId: data.parentCommentId ?? null,
      timestamp: serverTimestamp(),
      likesCount: 0,
      dislikesCount: 0,
    });

    await updateDoc(articleRef, { commentsCount: increment(1) });

    return newCommentRef.id;
  },

  /** Мягкое удаление: данные обнуляются, дерево ответов сохраняется */
  async removeComment(articleId: string, commentId: string): Promise<string> {
    const commentRef = doc(db, ARTICLES_PATH, articleId, COMMENTS_PATH, commentId);
    const reactionsRef = collection(
      db,
      ARTICLES_PATH,
      articleId,
      COMMENTS_PATH,
      commentId,
      REACTIONS_PATH
    );

    const reactionsSnap = await getDocs(reactionsRef);
    const batch = writeBatch(db);

    reactionsSnap.docs.forEach((d) => batch.delete(d.ref));
    batch.update(commentRef, {
      deleted: true,
      userId: null,
      name: null,
      text: null,
      likesCount: 0,
      dislikesCount: 0,
    });

    await batch.commit();

    return commentId;
  },
};
