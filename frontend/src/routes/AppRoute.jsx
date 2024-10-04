import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NoRouteFound from "./NoRouteFound";
import Home from "../components/Home";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NoRouteFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/route1",
        element: <div>You are logged in!</div>,
      },
    ],
  },
]);

function AppRoute() {
  return <RouterProvider router={router} />;
}

export { AppRoute as Routes };
