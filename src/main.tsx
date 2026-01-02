import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RoutinesAddPage from "./Pages/Routines/RoutinesAddPage";

const router = createBrowserRouter([
  {
    path: "/routines/new",
    element: <RoutinesAddPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
