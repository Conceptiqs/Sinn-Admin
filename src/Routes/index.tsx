import { createBrowserRouter, Navigate } from "react-router-dom";
import PermissionRoute from "../components/PermissionRoute";
import Layout from "../components/Layout";

import {
  Dashboard,
  Login,
  Doctors,
  DoctorDetails,
  Customers,
  Approvals,
  Services,
  Renewals,
  Cms,
  UserManagement,
  RoleManagement,
  Notifications,
} from "../Pages/Exports";

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
    element: <Layout />,
    children: [
      // dashboard is open to everyone once “logged in”
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      // all other pages require a corresponding "<type>-read" permission
      {
        path: "/doctors",
        element: (
          <PermissionRoute permission="doctor-read">
            <Doctors />
          </PermissionRoute>
        ),
      },
      {
        path: "/doctor/:id",
        element: (
          <PermissionRoute permission="doctor-view">
            <DoctorDetails />
          </PermissionRoute>
        ),
      },
      {
        path: "/customers",
        element: (
          <PermissionRoute permission="customer-read">
            <Customers />
          </PermissionRoute>
        ),
      },
      {
        path: "/approvals",
        element: (
          <PermissionRoute permission="approval-read">
            <Approvals />
          </PermissionRoute>
        ),
      },
      {
        path: "/services",
        element: (
          <PermissionRoute permission="service-read">
            <Services />
          </PermissionRoute>
        ),
      },
      {
        path: "/renewals",
        element: (
          <PermissionRoute permission="revewal-read">
            <Renewals />
          </PermissionRoute>
        ),
      },
      {
        path: "/cms",
        element: (
          <PermissionRoute permission="cms-read">
            <Cms />
          </PermissionRoute>
        ),
      },
      {
        path: "/roles/user-management",
        element: (
          <PermissionRoute permission="user-read">
            <UserManagement />
          </PermissionRoute>
        ),
      },
      {
        path: "/roles/role-management",
        element: (
          <PermissionRoute permission="role-read">
            <RoleManagement />
          </PermissionRoute>
        ),
      },
      {
        path: "/notification",
        element: (
          <PermissionRoute permission="notification-read">
            <Notifications />
          </PermissionRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    // you could render a custom 404 or redirect to /dashboard
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
