import React, { useState, useEffect } from "react";
import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Box sx={{ display: "flex", overflow: "hidden", width: "100%" }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "white",
          padding: 0,
          marginLeft: isMobile ? "0px" : isSidebarOpen ? "0px" : "-180px",
          transition: "margin-left 0.3s ease",
          overflow: "hidden",
        }}
      >
        <Header onSidebarToggle={handleSidebarToggle} />
        <Toolbar />
        <Box sx={{ zIndex: 1200, padding: 2, overflow: "hidden" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
