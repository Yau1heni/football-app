import { type QueryDocumentSnapshot, type SnapshotOptions } from 'firebase/firestore';
import type { Article, Reaction } from 'types/articles.type.ts';
import type { Club } from 'types/clubs.types.ts';

// Solving the problem of entering return data.
// source: http://javascript.plainenglish.io/mastering-firestore-converters-with-typescript-d433827a38c2

export const createFirestoreConverter = <T>() => {
  return {
    toFirestore: (item: T) => {
      return {
        ...item,
      };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot<T>, options?: SnapshotOptions) => {
      const data = snapshot.data(options);
      return {
        ...data,
        id: snapshot.id,
      };
    },
  };
};

export const clubsFirestoreConverter = createFirestoreConverter<Club>();
export const favoritesFirestoreConverter = createFirestoreConverter<{ clubId: string }>();
export const articlesFirestoreConverter = createFirestoreConverter<Article>();
export const userReactionByArticleIdFirestoreConverter = createFirestoreConverter<Reaction>();
