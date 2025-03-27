import React from 'react';
import { Drawer, Box, useMediaQuery } from '@mui/material';
import Navigation from './SidebarNav/Navigation'; // Import the Navigation component

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void; // Add onClose as a prop
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm')); // Check if the screen is small (mobile)

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'} // Switch between temporary and persistent drawer based on screen size
      anchor="left"
      open={isOpen}
      onClose={onClose} // Close drawer when clicking outside
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          overflowX: 'hidden', // Ensure no horizontal scrollbar in the Drawer
        },
      }}
      ModalProps={{
        keepMounted: true, // Improves performance on mobile by not unmounting the Drawer
      }}
    >
      <Box
        sx={{
          width: '100%', // Ensure the width matches the Drawer width
          backgroundColor: 'white',
          paddingTop: '80px', // Move content down from the top
          overflow: 'hidden', // Hide any overflow content
          height: '100%', // Ensure the height of the Box fills the Drawer
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Pass the onClose function to the Navigation component */}
        <Navigation onNavigate={onClose} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
