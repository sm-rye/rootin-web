import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RoutineCreatePage from './Pages/Routine/RoutineCreatePage';
import RoutinePage from './Pages/Routine/RoutinePage';
import RoutineDetailPage from './Pages/Routine/RoutineDetailPage';

const router = createBrowserRouter([
  {
    path: '/routines',
    element: <RoutinePage />,
  },
  {
    path: '/routines/new',
    element: <RoutineCreatePage />,
  },
  {
    path: '/routines/:id',
    element: <RoutineDetailPage />,
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />{' '}
  </QueryClientProvider>,
);
