import { createBrowserRouter } from 'react-router-dom';

import {
  RoutineCreatePage,
  RoutinePage,
  RoutineDetailPage,
  AuthPage,
  ProfilePage,
  NotFoundPage,
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
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
