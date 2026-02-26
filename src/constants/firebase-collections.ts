export const CLUBS_COLLECTIONS = {
  PATH: 'clubs',
  FIELD_PATH: {
    NAME: 'name',
    CITY: 'city',
    COUNTRY: 'country',
    TOTAL_TROPHIES: 'totalTrophies',
    FOUNDED: 'founded',
  },
  SUBCOLLECTIONS: {},
} as const;

export const USERS_COLLECTIONS = {
  PATH: 'users',
  SUBCOLLECTIONS: {
    FAVORITES: 'favorites',
  },
} as const;

export const FAVORITES_COLLECTIONS = {
  PATH: 'favorites',
  FIELD_PATH: {
    ids: 'ids',
  },
} as const;
