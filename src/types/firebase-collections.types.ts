import type { CLUBS_COLLECTIONS } from 'constants/firebase-collections.ts';

export type ClubFields =
  (typeof CLUBS_COLLECTIONS.FIELD_PATH)[keyof typeof CLUBS_COLLECTIONS.FIELD_PATH];
