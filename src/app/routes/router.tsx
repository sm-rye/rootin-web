import { createBrowserRouter } from 'react-router-dom';

import {
  RoutineCreatePage,
  RoutinePage,
  RoutineDetailPage,
  AuthPage,
} from '@/Pages';

import BaseLayout from '../Layouts/BaseLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      { index: true, element: <RoutinePage /> },
      {
        path: 'routines',
        element: <RoutinePage />,
      },
      {
        path: 'routines/new',
        element: <RoutineCreatePage />,
      },
      {
        path: 'routines/:id',
        element: <RoutineDetailPage />,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
]);
