import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { logoImage, sinnlabel } from "../assets";
import { MenuIcon } from "../assets";
import theme from "../theme/theme";
import Profile from "./headerComponents/Profile"; // Import the new Profile component
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)"); // Check if the screen is small (mobile)

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          ml: `250px`,
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "none",
          zIndex: 1201,
          height: "70px",
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" width="100%">
            {/* Logo Section */}
            <Box
              display="flex"
              alignItems="center"
              sx={{
                mr: 1,
                marginLeft: "0px",
                display: { xs: "flex", md: "block" },
              }}
            >
              <img
                src={logoImage}
                alt="Logo"
                style={{ height: "40px", marginRight: "10px" }}
              />
              <img
                src={sinnlabel}
                alt="Label"
                style={{ height: "30px", marginRight: "20px" }}
              />
            </Box>

            {/* Sidebar Toggle Button */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onSidebarToggle}
              sx={{ mr: 2, display: "flex", marginLeft: "1%" }}
            >
              <Box>
                <img src={MenuIcon} alt="description" />
              </Box>
            </IconButton>

            {/* Icons Section */}
            <Box display="flex" alignItems="center" sx={{ ml: "auto" }}>
              {/* Search Box - Visible only on larger screens */}
              {/* <Box
                alignItems="center"
                sx={{
                  display: { xs: "none", md: "flex" },
                  border: "none",
                  borderRadius: "20px",
                  padding: "5px 10px",
                  backgroundColor: "#f9f9f9",
                  mr: 2,
                }}
              >
                <SearchIcon sx={{ color: "#888" }} />
                <input
                  type="text"
                  placeholder="Search here..."
                  style={{
                    border: "none",
                    outline: "none",
                    width: "100%",
                    marginLeft: "8px",
                    backgroundColor: "transparent",
                  }}
                />
              </Box> */}

              {/* Hide on mobile */}
              {!isMobile && (
                <>
                  <IconButton onClick={() => navigate("/notification")}>
                    <NotificationsIcon />
                  </IconButton>
                </>
              )}

              {/* Profile Component */}
              <Profile />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
