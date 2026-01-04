import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router";
import MainAppRoutes from "apps/MainApp/router/MainAppRoutes";
import * as React from "react";
import AdminProtectedRoute from "components/gating/AdminProtectedRoute";


const router = createBrowserRouter(
  MainAppRoutes.map(route => ({
    path: route.path,
    element: route.isGated ? (
      <AdminProtectedRoute>
        {route.element}
      </AdminProtectedRoute>
    ) : route.element
  }))
);

export default function MainAppRouter() {
  return <RouterProvider router={router} />;
}