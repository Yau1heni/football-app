import { SOCIAL_ICONS } from 'constants/social-icons.ts';

import type { IconProps } from 'components/ui/icons';
import type { FC } from 'react';
import type { SocialIconsNames } from 'types/clubs.types.ts';

export const getSocialIcon = (name: string): FC<IconProps> => {
  const lowerName = name.toLowerCase();
  if (lowerName in SOCIAL_ICONS) {
    return SOCIAL_ICONS[lowerName as SocialIconsNames];
  }

  return SOCIAL_ICONS.defaultIcon;
};
