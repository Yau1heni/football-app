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
  login: {
    mask: '/login',
  },
  register: {
    mask: '/register',
  },
  notFound: {
    mask: '/not-found',
  },
};
