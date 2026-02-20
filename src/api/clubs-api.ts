import { CLUBS_COLLECTIONS } from 'constants/firebase-collections.ts';
import { PAGINATION_LIMIT, START_PAGE } from 'constants/pagination.ts';
import { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import { db } from 'configs/firebase-config.ts';
import { clientTypesense } from 'configs/typesense-config.ts';
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

type GetClubsTypesenseOptions = {
  searchTerm?: string;
  page?: number;
  sortDirection?: string;
  sortBy?: string;
};

export const clubsApi = {
  async getClubsFromTypesense(options: GetClubsTypesenseOptions): Promise<Club[]> {
    const {
      searchTerm = '',
      page = START_PAGE,
      sortDirection = SORT_DIRECTIONS.ASC,
      sortBy = CLUBS_COLLECTIONS.FIELD_PATH.NAME,
    } = options;

    const response = await clientTypesense
      .collections(CLUBS_COLLECTIONS.PATH)
      .documents()
      .search({
        q: searchTerm,
        query_by: CLUBS_COLLECTIONS.FIELD_PATH.NAME,
        page,
        per_page: PAGINATION_LIMIT,
        sort_by: `${sortBy}:${sortDirection}`,
        infix: 'always',
        num_typos: 1,
      });

    return (response.hits ?? []).map((hit) => hit.document as Club);
  },

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
