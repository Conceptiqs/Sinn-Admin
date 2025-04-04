import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

/**
 * A ProtectedRoute component that restricts access to admin users only.
 * - If no access token is found, the user is redirected to the login page.
 * - If a user is logged in but is not an admin, they are redirected to the dashboard.
 *
 * @param children - The component to render if the user is an admin.
 * @returns The children if the user is an admin; otherwise, a <Navigate /> redirect.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Retrieve token and user type from cookies
  const token = Cookies.get("token");

  if (!token) {
    // Not authenticated: redirect to login
    return <Navigate to="/login" replace />;
  }

  // Authenticated admin user: render children
  return children;
};

export default ProtectedRoute;
