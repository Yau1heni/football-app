export const routes = {
  main: {
    mask: '/',
    create: () => '/',
  },
  club: {
    mask: '/club/:id',
    create: (id: string) => `/club/${id}`,
  },
  notFound: {
    mask: '/not-found',
  },
};
