import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getUserPermissions } from "../apis/permissions";

type Permission = { name: string }; // Adjust this type based on your permission structure

interface PermissionsContextType {
  permissions: Permission[];
  hasPermission: (perm: string) => boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

export const PermissionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await getUserPermissions(); // Replace with your actual API call
        const fetchedPermissions = res?.data?.["roles.permissions"] || [];
        setPermissions(fetchedPermissions);
      } catch (error) {
        console.error("Failed to fetch permissions:", error);
      }
    };

    fetchPermissions();
  }, []);

  const hasPermission = (perm: string) =>
    permissions.some((p) => p.name === perm);

  return (
    <PermissionsContext.Provider value={{ permissions, hasPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
