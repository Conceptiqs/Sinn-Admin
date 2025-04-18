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
  onNavigate: () => void; // Function to close the sidebar on navigation
  permissions: any;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate,permissions }) => {
  const [openRoles, setOpenRoles] = useState(false);

  // Toggle Roles & Permissions submenu
  const handleRolesToggle = () => {
    setOpenRoles(!openRoles);
  };

  // List of navigation links (excluding Notifications)
  const navigationLinks = [
    { label: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Doctors", path: "/doctors", icon: <PeopleIcon /> },
    { label: "Customers", path: "/customers", icon: <PeopleIcon /> },
    { label: "Approvals", path: "/approvals", icon: <ApprovalIcon /> },
    { label: "Services", path: "/services", icon: <DesignServicesIcon /> },
    { label: "Renewals", path: "/renewals", icon: <AutorenewIcon /> },
    { label: "CMS", path: "/cms", icon: <WebIcon /> },
  ];

  return (
    <List>
      {/* Main navigation links */}
      {navigationLinks.map((link, index) => (
        <ListItemButton
          key={index}
          component={Link}
          to={link.path}
          onClick={onNavigate} // Close sidebar on navigation
        >
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.label} />
        </ListItemButton>
      ))}

      {/* Roles & Permissions */}
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
            onClick={onNavigate} // Close sidebar on navigation
          >
            <ListItemText primary="User Management" />
          </ListItemButton>
          <ListItemButton
            sx={{ pl: 4 }}
            component={Link}
            to="/roles/role-management"
            onClick={onNavigate} // Close sidebar on navigation
          >
            <ListItemText primary="Role Management" />
          </ListItemButton>
        </List>
      </Collapse>

      {/* Notifications (last item) */}
      <ListItemButton component={Link} to="/notification" onClick={onNavigate}>
        <ListItemIcon>
          <NotificationsIcon />
        </ListItemIcon>
        <ListItemText primary="Notification" />
      </ListItemButton>
    </List>
  );
};

export default Navigation;
