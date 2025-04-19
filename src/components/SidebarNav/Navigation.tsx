import React, { useState, useEffect } from "react";
import {
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  HowToReg as ApprovalIcon,
  DesignServices as DesignServicesIcon,
  Autorenew as AutorenewIcon,
  Web as WebIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

interface NavigationProps {
  onNavigate: () => void;
}

interface NavLink {
  label: string;
  path: string;
  icon: React.ReactNode;
  type?: string;
}

const allLinks: NavLink[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    type: "dashboard",
  },
  { label: "Doctors", path: "/doctors", icon: <PeopleIcon />, type: "doctor" },
  {
    label: "Customers",
    path: "/customers",
    icon: <PeopleIcon />,
    type: "customer",
  },
  {
    label: "Approvals",
    path: "/approvals",
    icon: <ApprovalIcon />,
    type: "approval",
  },
  {
    label: "Services",
    path: "/services",
    icon: <DesignServicesIcon />,
    type: "service",
  },
  {
    label: "Renewals",
    path: "/renewals",
    icon: <AutorenewIcon />,
    type: "renewal",
  },
  { label: "CMS", path: "/cms", icon: <WebIcon />, type: "cms" },
];

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [openRoles, setOpenRoles] = useState(false);
  const [perms, setPerms] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("permissions");
      if (!raw) return;
      const arr: { name: string }[] = JSON.parse(raw);
      setPerms(new Set(arr.map((p) => p.name)));
    } catch {
      // ignore parse errors
    }
  }, []);

  const visibleLinks = allLinks.filter((link) => {
    if (link.type === "dashboard") return true;
    return link.type ? perms.has(`${link.type}-read`) : false;
  });

  const showNotifications = perms.has("notification-read");

  // Permissions for Roles & Permissions submenu
  const canViewUserMgmt = perms.has("user-read");
  const canViewRoleMgmt = perms.has("role-read");
  const canViewRolesSection = canViewUserMgmt || canViewRoleMgmt;

  const handleRolesToggle = () => setOpenRoles((v) => !v);

  return (
    <List>
      {visibleLinks.map((link) => (
        <ListItemButton
          key={link.path}
          component={Link}
          to={link.path}
          onClick={onNavigate}
        >
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.label} />
        </ListItemButton>
      ))}

      {canViewRolesSection && (
        <>
          <ListItemButton onClick={handleRolesToggle}>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Roles & Permissions" />
            {openRoles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          <Collapse in={openRoles} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {canViewUserMgmt && (
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/roles/user-management"
                  onClick={onNavigate}
                >
                  <ListItemText primary="User Management" />
                </ListItemButton>
              )}
              {canViewRoleMgmt && (
                <ListItemButton
                  sx={{ pl: 4 }}
                  component={Link}
                  to="/roles/role-management"
                  onClick={onNavigate}
                >
                  <ListItemText primary="Role Management" />
                </ListItemButton>
              )}
            </List>
          </Collapse>
        </>
      )}

      {showNotifications && (
        <ListItemButton
          component={Link}
          to="/notification"
          onClick={onNavigate}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notification" />
        </ListItemButton>
      )}
    </List>
  );
};

export default Navigation;
