import type { FC } from 'react';

import { Icon, type IconProps } from '../icon';

export const LikeIcon: FC<IconProps> = (props) => (
  <Icon width={24} height={24} viewBox="0 0 24 24" {...props}>
    <path
      d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 11H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);
