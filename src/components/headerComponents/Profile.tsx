import React from 'react';
import { IconButton, Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/login'); // Redirect to the login page
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Profile">
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt="User Profile" src="/path-to-avatar.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}

        
      >
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
