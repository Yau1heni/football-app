import type { SOCIAL_ICONS } from 'constants/social-icons.ts';
import type { SORT_DIRECTIONS } from 'constants/sort-direction.ts';

import type { Timestamp } from 'firebase/firestore';
import type { ClubFields } from 'types/firebase-collections.types.ts';

export type Club = {
  id: string;
  name: string;
  country: string;
  city: string;
  colors: string[];
  founded: number;
  ground: string;
  website: string;
  logo: string | null;
  createdAt: Timestamp;
  history: string;
  trophies: {
    name: string;
    count: number;
  }[];
  totalTrophies: number;
  social: { name: SocialIconsNames; link: string }[];
};

export type SocialIconType = { name: string; link: string };
export type SocialIconsNames = keyof typeof SOCIAL_ICONS;

export type SortDirection = (typeof SORT_DIRECTIONS)[keyof typeof SORT_DIRECTIONS];
export type SortBy = `${ClubFields}:${SortDirection}`;
