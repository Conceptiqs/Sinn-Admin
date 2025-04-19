import React, { useState, FormEvent } from "react";
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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordApi,
  login,
  resetPasswordApi,
  verifyOtpApi,
} from "../../apis/auth/login";

type Step = "LOGIN" | "FORGOT_PASSWORD" | "OTP_VERIFICATION" | "RESET_PASSWORD";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] =
    useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<Step>("LOGIN");

  const handleResetForm = () => {
    setPhone("");
    setPassword("");
    setShowPassword(false);
    setOtp("");
    setNewPassword("");
    setNewPasswordConfirmation("");
    setError("");
    setStep("LOGIN");
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setError("");
    if (!phone.trim() || !password.trim()) {
      setError("Please enter both phone number and password.");
      return;
    }
    setLoading(true);
    try {
      const response = await login(phone, password);
      console.log("Login successful", response);
      if (response?.data?.token) {
        Cookies.set("token", response.data.token);
        navigate("/dashboard", { state: response.data });
      } else {
        setError("Login failed: Invalid credentials.");
      }
    } catch (err: any) {
      setError("Failed to login, please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }
    setLoading(true);
    try {
      const response = await forgotPasswordApi(phone);
      console.log("Forgot password successful", response);
      setStep("OTP_VERIFICATION");
    } catch (err: any) {
      setError("Failed to submit forgot password request, please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setError("");
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtpApi(phone, otp);
      console.log("OTP verification successful", response);
      setStep("RESET_PASSWORD");
    } catch (err: any) {
      setError("OTP verification failed, please check and try again.");
      console.error("OTP verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    if (!newPassword.trim() || !newPasswordConfirmation.trim()) {
      setError("Please fill out all password fields.");
      return;
    }
    if (newPassword !== newPasswordConfirmation) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await resetPasswordApi(
        phone,
        otp,
        newPassword,
        newPasswordConfirmation
      );
      console.log("Password reset successful", response);
      handleResetForm();
    } catch (err: any) {
      setError("Password reset failed, please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (step) {
      case "LOGIN":
        return (
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 350 }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
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
            {error && (
              <Typography
                variant="body1"
                sx={{ color: "red", marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
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
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                textAlign: "center",
                cursor: "pointer",
                color: "#0B3C5D",
              }}
              onClick={() => {
                setError("");
                setStep("FORGOT_PASSWORD");
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        );

      case "FORGOT_PASSWORD":
        return (
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 350 }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Forgot Password
            </Typography>
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
            />
            {error && (
              <Typography
                variant="body1"
                sx={{ color: "red", marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
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
                "Submit"
              )}
            </Button>
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                textAlign: "center",
                cursor: "pointer",
                color: "#0B3C5D",
              }}
              onClick={() => {
                setError("");
                setStep("LOGIN");
              }}
            >
              Back to Login
            </Typography>
          </Box>
        );

      case "OTP_VERIFICATION":
        return (
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 350 }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleOtpVerification();
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              OTP Verification
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              An OTP has been sent to {phone}
            </Typography>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
            />
            {error && (
              <Typography
                variant="body1"
                sx={{ color: "red", marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
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
                "Verify OTP"
              )}
            </Button>
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                textAlign: "center",
                cursor: "pointer",
                color: "#0B3C5D",
              }}
              onClick={() => {
                setError("");
                setStep("FORGOT_PASSWORD");
              }}
            >
              Back
            </Typography>
          </Box>
        );

      case "RESET_PASSWORD":
        return (
          <Box
            component="form"
            sx={{ width: "100%", maxWidth: 350 }}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleResetPassword();
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Reset Password
            </Typography>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPasswordConfirmation}
              onChange={(e) => setNewPasswordConfirmation(e.target.value)}
              InputProps={{ style: { backgroundColor: "#f9f9f9" } }}
            />
            {error && (
              <Typography
                variant="body1"
                sx={{ color: "red", marginBottom: 2 }}
              >
                {error}
              </Typography>
            )}
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
                "Reset Password"
              )}
            </Button>
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                textAlign: "center",
                cursor: "pointer",
                color: "#0B3C5D",
              }}
              onClick={() => {
                setError("");
                navigate("/login");
              }}
            >
              Back to Login
            </Typography>
          </Box>
        );

      default:
        return null;
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
            {step === "LOGIN"
              ? "Become part of something great. Sign in"
              : "Recover your account"}
          </Typography>

          {renderForm()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
