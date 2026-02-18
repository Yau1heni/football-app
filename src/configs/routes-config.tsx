import App from 'app.tsx';
import { routes } from 'configs/routes.ts';
import { ClubPage } from 'pages/club';
import { ClubsPage } from 'pages/clubs';
import { NotFound } from 'pages/not-found';
import { Navigate, type RouteObject } from 'react-router';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.main.mask,
        element: <ClubsPage />,
      },
      {
        path: routes.club.mask,
        element: <ClubPage />,
      },
    ],
  },
  {
    path: routes.notFound.mask,
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to={routes.notFound.mask} replace />,
  },
];
