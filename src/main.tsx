import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RoutinesAddPage from './Pages/Routines/RoutinesAddPage';
import RoutinesPage from './Pages/Routines/RoutinesPage';

const router = createBrowserRouter([
  {
    path: '/routines',
    element: <RoutinesPage />,
  },
  {
    path: '/routines/new',
    element: <RoutinesAddPage />,
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />{' '}
  </QueryClientProvider>,
);
