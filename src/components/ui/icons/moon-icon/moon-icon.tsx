import type { FC } from 'react';

import { type IconProps, Icon } from '../icon';

export const MoonIcon: FC<IconProps> = (props) => (
  <Icon
    width={22}
    height={22}
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);
