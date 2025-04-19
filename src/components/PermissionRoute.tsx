// src/components/PermissionRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePermissions } from "../context/permissions";

interface PermissionRouteProps {
  permission: string; // e.g. "doctor-read"
  children: React.ReactNode; // the page component
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  permission,
  children,
}) => {
  const location = useLocation();

  const { hasPermission } = usePermissions();

  // if the user has the required read permission → render the page
  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  // otherwise redirect them back to dashboard (or a custom 403 page)
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default PermissionRoute;
