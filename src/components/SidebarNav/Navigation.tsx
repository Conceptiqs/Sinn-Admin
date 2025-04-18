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
  // type here corresponds to your permission `type` field:
  // e.g. "dashboard" (if you had one), "doctors", "customers", etc.
  // We'll derive the permission key as `${type}-read`
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
    type: "revewal",
  },
  { label: "CMS", path: "/cms", icon: <WebIcon />, type: "cms" },
];

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [openRoles, setOpenRoles] = useState(false);
  const [perms, setPerms] = useState<Set<string>>(new Set());

  // Load permissions from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("permissions");
      if (!raw) return;
      const arr: { name: string }[] = JSON.parse(raw);
      setPerms(new Set(arr.map((p) => p.name)));
    } catch {
      // malformed or missing → leave perms empty
    }
  }, []);

  const handleRolesToggle = () => setOpenRoles((v) => !v);

  // Only show links for which user has `<type>-read`
  // After: Dashboard is unconditionally visible
  const visibleLinks = allLinks.filter((link) => {
    // Always include Dashboard
    if (link.type === "dashboard") {
      return true;
    }
    // For all others, require "<type>-read"
    return link.type ? perms.has(`${link.type}-read`) : false;
  });

  const showNotifications = perms.has("notification-read");

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

      {/* Roles & Permissions always visible */}
      <ListItemButton onClick={handleRolesToggle}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary="Roles & Permissions" />
        {openRoles ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={openRoles} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/roles/user-management"
            onClick={onNavigate}
          >
            <ListItemText primary="User Management" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/roles/role-management"
            onClick={onNavigate}
          >
            <ListItemText primary="Role Management" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Notifications only if `notification-read` */}
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
