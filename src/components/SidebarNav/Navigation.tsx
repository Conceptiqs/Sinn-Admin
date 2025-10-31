import React, { useState } from "react";
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
  LocalHospital as ClinicIcon,
  HowToReg as ApprovalIcon,
  DesignServices as DesignServicesIcon,
  Autorenew as AutorenewIcon,
  Web as WebIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  CreditCard as SubscriptionIcon,
  ReceiptLong as TransactionsIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { usePermissions } from "../../context/permissions";

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
  { label: "Clinics", path: "/clinics", icon: <ClinicIcon />, type: "clinic" },
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
  {
    label: "Subscription Plans",
    path: "/subscription-plans",
    icon: <SubscriptionIcon />,
    type: "subscription",
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: <TransactionsIcon />,
    type: "transaction",
  },
];

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [openRoles, setOpenRoles] = useState(false);
  const { hasPermission } = usePermissions();

  const visibleLinks = allLinks.filter((link) => {
    if (link.type === "dashboard") return true;
    if (link.type === "clinic") return true; // Skip permission check for clinics
    if (link.type === "subscription") return true; // Skip permission check for subscription plans
    if (link.type === "transaction") return true; // Skip permission check for transactions
    return link.type ? hasPermission(`${link.type}-read`) : false;
  });

  const showNotifications = hasPermission("notification-read");

  // Permissions for Roles & Permissions submenu
  const canViewUserMgmt = hasPermission("user-read");
  const canViewRoleMgmt = hasPermission("role-read");
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
