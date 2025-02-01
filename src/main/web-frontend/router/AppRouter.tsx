import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router";
import AppRoutes from "./AppRoutes";
import * as React from "react";
import AdminProtectedRoute from "../components/gating/AdminProtectedRoute";


const router = createBrowserRouter(
  AppRoutes.map(route => ({
    path: route.path,
    element: route.isGated ? (
      <AdminProtectedRoute>
        {route.element}
      </AdminProtectedRoute>
    ) : route.element
  }))
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}