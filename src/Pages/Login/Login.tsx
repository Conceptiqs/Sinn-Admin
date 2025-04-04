import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { logoImage, loginImage } from "../../assets";
import { login } from "../../apis/auth/login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await login(username, password);

      console.log("Login successful", response);
      if (response?.data?.token) {
        Cookies.set("token", response?.data?.token);
        localStorage.setItem("name", response?.data?.name);
        navigate(`/dashboard`);
      }
    } catch (err: any) {
      setError("Failed to login, please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid
        container
        sx={{ height: "100%", width: "100%", margin: 0, padding: 0 }}
      >
        {/* Left Side: Image */}
        {!isSmallScreen && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${loginImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              height: "100%",
            }}
          />
        )}

        {/* Right Side: Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            padding: isSmallScreen ? 3 : 6,
            height: "100%",
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logoImage}
            alt="Logo"
            sx={{ width: 80, height: "auto", marginBottom: 3 }}
          />

          {/* Title */}
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            sx={{
              fontWeight: "bold",
              color: "#0B3C5D",
              marginBottom: 1,
              textAlign: "center",
            }}
          >
            SINN سن
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              marginBottom: 4,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Become part of something great. Sign in
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography variant="body1" sx={{ color: "red", marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Form */}
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 350,
            }}
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: { backgroundColor: "#f9f9f9" },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { backgroundColor: "#f9f9f9" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                marginTop: 2,
                backgroundColor: "#0B3C5D",
                color: "#fff",
                padding: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#06283D" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
