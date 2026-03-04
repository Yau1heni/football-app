import { CLUBS_COLLECTIONS } from 'constants/firebase-collections.ts';
import { PAGINATION_LIMIT, START_PAGE } from 'constants/pagination.ts';

import { db } from 'configs/firebase-config.ts';
import { clientTypesense } from 'configs/typesense-config.ts';
import { doc, getDoc } from 'firebase/firestore';
import type { Club, GetClubsResponse, GetClubsTypesenseOptions } from 'types/clubs.types.ts';
import { clubsFirestoreConverter } from 'utils/firebase-converter.ts';

export const clubsApi = {
  async getFromTypesense(options: GetClubsTypesenseOptions): Promise<GetClubsResponse> {
    const { searchTerm = '', page = START_PAGE, sort, countries, favoritesIds } = options;

    // «Только избранное» включён, но избранных нет — возвращаем пустой список без запроса к Typesense
    if (favoritesIds && favoritesIds.length === 0) {
      return { clubsData: [], found: 0 };
    }

    const filterParts: string[] = [];
    if (countries?.length) {
      filterParts.push(`${CLUBS_COLLECTIONS.FIELD_PATH.COUNTRY}:[${countries.join(',')}]`);
    }
    if (favoritesIds) {
      filterParts.push(`id:[${favoritesIds.join(',')}]`);
    }
    const filter_by = filterParts.length ? filterParts.join(' && ') : undefined;

    const response = await clientTypesense
      .collections(CLUBS_COLLECTIONS.PATH)
      .documents()
      .search({
        q: searchTerm,
        ...(filter_by != null ? { filter_by } : {}),
        query_by: CLUBS_COLLECTIONS.FIELD_PATH.NAME,
        page,
        per_page: PAGINATION_LIMIT,
        sort_by: sort ? sort.replace('_', ':') : `${CLUBS_COLLECTIONS.FIELD_PATH.NAME}:asc`,
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
