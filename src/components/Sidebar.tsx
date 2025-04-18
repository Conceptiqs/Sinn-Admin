import React from "react";
import { Drawer, Box, useMediaQuery } from "@mui/material";
import Navigation from "./SidebarNav/Navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, permissions }) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          overflowX: "hidden",
        },
      }}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          paddingTop: "80px",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navigation onNavigate={onClose} permissions={permissions} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
