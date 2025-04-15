import React, { useState, useEffect } from 'react';
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm')); // Detect mobile view

  // Set the initial state of sidebar based on screen size
  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true); // Open the sidebar by default on desktop
    } else {
      setIsSidebarOpen(false); // Keep it closed on mobile
    }
  }, [isMobile]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const handleSidebarClose = () => {
    if (isMobile) {
      setIsSidebarOpen(false); // Close the sidebar on mobile when clicking outside
    }
  };

  return (
    <Box sx={{ display: 'flex', overflow: 'hidden', width: '100%' }}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} /> {/* Pass onClose handler */}
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          padding: 0,
          marginLeft: isMobile
            ? '0px' // For mobile, no margin adjustment
            : isSidebarOpen
            ? '0px'
            : '-180px', // For web, adjust margins based on sidebar state
          transition: 'margin-left 0.3s ease', // Smooth transition for sidebar toggle
          overflow: 'hidden',
        }}
      >
        <Header onSidebarToggle={handleSidebarToggle} /> {/* Pass toggle function to Header */}
        <Toolbar />
        <Box sx={{ zIndex: 1200, padding: 2, overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;

