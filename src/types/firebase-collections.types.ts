import type { COLLECTIONS } from 'constants/collections.ts';

export type ClubFields =
  (typeof COLLECTIONS.CLUBS.FIELD_PATH)[keyof typeof COLLECTIONS.CLUBS.FIELD_PATH];
