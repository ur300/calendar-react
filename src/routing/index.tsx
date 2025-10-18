import { type ReactNode } from 'react';
import { type RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CalendarPage } from '@/pages';

type RouteConfig = RouteObject & {
  element: ReactNode;
  children?: RouteConfig[];
};

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <CalendarPage />,
  },
];

export const Routes = () => {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};
