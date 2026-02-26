import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'components/error-boundary';
import { routesConfig } from 'configs/routes-config.tsx';
import { clientOptions } from 'configs/tanstack-query-config.ts';
import { AuthProvider } from 'contexts/auth';
import { FavoritesProvider } from 'contexts/favorites';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import 'styles/styles.scss';

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById('root') as HTMLDivElement);

const queryClient = new QueryClient(clientOptions);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <FavoritesProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools />
          </FavoritesProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
