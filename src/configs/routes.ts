export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  club: {
    mask: '/club/:id',
    create: (id: string) => `/club/${id}`,
  },
  articles: {
    mask: '/articles',
    create: () => '/articles',
  },
  article: {
    mask: '/article/:id',
    create: (id: string) => `/article/${id}`,
  },
  notFound: {
    mask: '/not-found',
  },
};
