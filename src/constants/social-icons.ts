import { InstagramIcon, SocialDefaultIcon, TgIcon, VkIcon, YoutubeIcon } from 'components/ui/icons';

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  twitter: SocialDefaultIcon,
  telegram: TgIcon,
  vk: VkIcon,
  facebook: SocialDefaultIcon,
  youtube: YoutubeIcon,
  defaultIcon: SocialDefaultIcon,
} as const;
