// src/components/PermissionRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PermissionRouteProps {
  permission: string; // e.g. "doctor-read"
  children: React.ReactNode; // the page component
}

const PermissionRoute: React.FC<PermissionRouteProps> = ({
  permission,
  children,
}) => {
  const location = useLocation();

  // load and parse your permissions array from localStorage
  const raw = localStorage.getItem("permissions");
  const perms: string[] = raw ? JSON.parse(raw).map((p: any) => p.name) : [];

  // if the user has the required read permission → render the page
  if (perms.includes(permission)) {
    return <>{children}</>;
  }

  // otherwise redirect them back to dashboard (or a custom 403 page)
  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default PermissionRoute;
