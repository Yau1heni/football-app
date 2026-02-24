import { CLUBS_COLLECTIONS } from 'constants/firebase-collections.ts';
import { PAGINATION_LIMIT, START_PAGE } from 'constants/pagination.ts';
import { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import { db } from 'configs/firebase-config.ts';
import { clientTypesense } from 'configs/typesense-config.ts';
import { doc, getDoc } from 'firebase/firestore';
import type { Club, GetClubsResponse } from 'types/clubs.types.ts';
import { clubsFirestoreConverter } from 'utils/firebase-converter.ts';

type GetClubsTypesenseOptions = {
  searchTerm?: string;
  page?: number;
  sortDirection?: string;
  sortBy?: string;
};

export const clubsApi = {
  async getFromTypesense(options: GetClubsTypesenseOptions): Promise<GetClubsResponse> {
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

    const data = (response.hits ?? []).map((hit) => hit.document as Club);

    return { clubsData: data, found: response.found };
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
};
