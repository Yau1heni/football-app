import { CLUBS_COLLECTIONS } from 'constants/firebase-collections.ts';

import { db } from 'configs/firebase-config.ts';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  getCountFromServer,
} from 'firebase/firestore';
import type { Club } from 'types/clubs.types.ts';
import { clubsFirestoreConverter } from 'utils/firebase-converter.ts';

export const clubsApi = {
  async getClubs(): Promise<Club[]> {
    const clubsCollection = collection(db, CLUBS_COLLECTIONS.PATH);
    const clubsQuery = query(clubsCollection, orderBy(CLUBS_COLLECTIONS.FIELD_PATH.NAME));
    const convertedData = clubsQuery.withConverter(clubsFirestoreConverter);
    const clubsSnapshot = await getDocs(convertedData);

    return clubsSnapshot.docs.map((doc) => doc.data());
  },

  async getClub(id: string): Promise<Club | null> {
    const clubCollection = doc(db, CLUBS_COLLECTIONS.PATH, id);
    const convertedData = clubCollection.withConverter(clubsFirestoreConverter);
    const clubSnapshot = await getDoc(convertedData);

    if (clubSnapshot.exists()) {
      return clubSnapshot.data();
    }

    return null;
  },

  async getTotalClubsCount() {
    const clubsCollection = collection(db, CLUBS_COLLECTIONS.PATH);
    const clubsSnapshot = await getCountFromServer(clubsCollection);

    return clubsSnapshot.data().count;
  },
};
