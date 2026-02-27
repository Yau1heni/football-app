import { ProtectedRoute } from 'components/protected-route';
import { routes } from 'configs/routes.ts';
import { ArticlePage } from 'pages/article';
import { ArticlesPage } from 'pages/articles';
import { ClubPage } from 'pages/club';
import { ClubsPage } from 'pages/clubs';
import { Login } from 'pages/login';
import { NotFound } from 'pages/not-found';
import { Register } from 'pages/register';
import { Navigate, type RouteObject } from 'react-router';

import App from '../app.tsx';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.main.mask,
        element: (
          <ProtectedRoute>
            <ClubsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.club.mask,
        element: (
          <ProtectedRoute>
            <ClubPage />
          </ProtectedRoute>
        ),
      },
      {
        path: routes.articles.mask,
        element: <ArticlesPage />,
      },
      {
        path: routes.article.mask,
        element: <ArticlePage />,
      },
      {
        path: routes.login.mask,
        element: <Login />,
      },
      {
        path: routes.register.mask,
        element: <Register />,
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
