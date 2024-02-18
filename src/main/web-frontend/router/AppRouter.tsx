import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import * as React from "react";
import {useContext} from "react";
import AppContext from "../components/context/AppContext";
import AdminProtectedRoute from "../components/gating/AdminProtectedRoute";

export default function AppRouter() {
  const context = useContext(AppContext);
  return (
    <BrowserRouter>
        <Routes>
          {
            AppRoutes.map(route => {
              const page =
                route.isGated == true ?
                  (<AdminProtectedRoute>
                    {route.element}
                  </AdminProtectedRoute>) :
                  route.element
              return (
                <Route
                  key={'key'}
                  path={route.path}
                  element={page}/>
              );
            })
          }
          <Route path="*" element={<Navigate replace to="/404" /> } />
        </Routes>
    </BrowserRouter>
  )
}