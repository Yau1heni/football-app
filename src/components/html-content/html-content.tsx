import cn from 'classnames';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import type { FC } from 'react';

import styles from './html-content.module.scss';

type HtmlContentProps = {
  html: string;
  className?: string;
};

export const HtmlContent: FC<HtmlContentProps> = ({ html, className }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });

  return <div className={cn(styles.htmlContent, className)}>{parse(cleanHtml)}</div>;
};
