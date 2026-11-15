import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NotFound, RouteError } from '@/components/route-states';
import { ThemeProvider } from '@/components/theme-provider';
import { routeTree } from './routeTree.gen';
import './styles.css';

const FIVE_MINUTES = 5 * 60 * 1000;

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: FIVE_MINUTES,
  defaultPreloadStaleTime: FIVE_MINUTES,
  defaultPendingMs: 300,
  scrollRestoration: true,
  defaultErrorComponent: RouteError,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing #root element in index.html');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
