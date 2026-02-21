const DEFAULT_TITLE = '#iLoveThisGame';
const DEFAULT_DESCRIPTION = 'Сайт о футбольных клубах #iLoveThisGame';

const META_NAMES = {
  DESCRIPTION: 'description',
  OG_TITLE: 'og:title',
  OG_DESCRIPTION: 'og:description',
} as const;

const getOrCreateMeta = (name: string, isProperty?: boolean): HTMLMetaElement => {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
};

export type PageMetaOptions = {
  title?: string;
  description?: string;
};

export const setPageMeta = (options: PageMetaOptions): void => {
  const { title, description } = options;

  if (title !== undefined) {
    document.title = title;
  }

  if (description !== undefined) {
    const metaDesc = getOrCreateMeta(META_NAMES.DESCRIPTION);
    metaDesc.setAttribute('content', description);

    const ogDesc = getOrCreateMeta(META_NAMES.OG_DESCRIPTION, true);
    ogDesc.setAttribute('content', description);
  }

  if (title !== undefined) {
    const ogTitle = getOrCreateMeta(META_NAMES.OG_TITLE, true);
    ogTitle.setAttribute('content', title);
  }
};

export const resetPageMeta = (): void => {
  document.title = DEFAULT_TITLE;
  const metaDesc = getOrCreateMeta(META_NAMES.DESCRIPTION);
  metaDesc.setAttribute('content', DEFAULT_DESCRIPTION);
  const ogTitle = getOrCreateMeta(META_NAMES.OG_TITLE, true);
  ogTitle.setAttribute('content', DEFAULT_TITLE);
  const ogDesc = getOrCreateMeta(META_NAMES.OG_DESCRIPTION, true);
  ogDesc.setAttribute('content', DEFAULT_DESCRIPTION);
};

export { DEFAULT_TITLE, DEFAULT_DESCRIPTION };
