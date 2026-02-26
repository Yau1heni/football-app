import { FAVORITES_COLLECTIONS, USERS_COLLECTIONS } from 'constants/firebase-collections.ts';

import { db } from 'configs/firebase-config.ts';
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { favoritesFirestoreConverter } from 'utils/firebase-converter.ts';

const USERS_PATH = USERS_COLLECTIONS.PATH;
const FAVORITES_PATH = FAVORITES_COLLECTIONS.PATH;

export const favoritesApi = {
  async getAllIds(userId: string): Promise<string[]> {
    if (!userId) return [];
    const favoritesCollection = collection(db, USERS_PATH, userId, FAVORITES_PATH);
    const favoritesQuery = query(favoritesCollection);
    const convertedData = favoritesQuery.withConverter(favoritesFirestoreConverter);
    const favoritesSnapshot = await getDocs(convertedData);

    return favoritesSnapshot.docs.map((doc) => doc.id);
  },

  async addFavorite(userId: string, clubId: string) {
    await setDoc(doc(db, USERS_PATH, userId, FAVORITES_PATH, clubId), {
      clubId,
      addedAt: serverTimestamp(),
    });
  },

  async removeFavorite(userId: string, clubId: string) {
    await deleteDoc(doc(db, USERS_PATH, userId, FAVORITES_PATH, clubId));
  },
};
