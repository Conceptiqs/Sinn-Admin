import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  Dashboard,
  Login,
  Doctors,
  Customers,
  Approvals,
  Services,
  Renewals,
  Cms,
  UserManagement,
  RoleManagement,
  Notifications,
  DoctorDetails,
} from "../Pages/Exports";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ), // Wrap Layout with ProtectedRoute to secure nested routes
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/doctors",
        element: <Doctors />,
      },
      {
        path: "/doctor/:id",
        element: <DoctorDetails />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/approvals",
        element: <Approvals />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/renewals",
        element: <Renewals />,
      },
      {
        path: "/cms",
        element: <Cms />,
      },
      {
        path: "/roles/user-management",
        element: <UserManagement />,
      },
      {
        path: "/roles/role-management",
        element: <RoleManagement />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
    ],
  },
  {
    path: "*",
    // element: <NotFound />,  // Optional custom 404 page
  },
]);

export default router;
