import type { SOCIAL_ICONS } from 'constants/social-icons.ts';

import type { Timestamp } from 'firebase/firestore';

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

export type GetClubsResponse = {
  clubsData: Club[];
  found: number;
};

export type SocialIconType = { name: string; link: string };
export type SocialIconsNames = keyof typeof SOCIAL_ICONS;

export type GetClubsTypesenseOptions = {
  searchTerm: string;
  page: number;
  sort?: string;
  countries?: string[];
  favoritesIds?: string[];
};
