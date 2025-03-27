import React, { useState } from 'react';
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
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { logoImage, loginImage } from '../../assets';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    const defaultPassword = '123456';

    if (password === defaultPassword) {
      try {
        console.log('Login successful');
        window.location.href = '/dashboard';
      } catch (error) {
        setError('Failed to login, please try again.');
        console.error('Login error', error);
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <Grid container sx={{ height: '100%', width: '100%', margin: 0, padding: 0 }}>
        {/* Left Side: Image */}
        {!isSmallScreen && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${loginImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              height: '100%',
            }}
          />
        )}

        {/* Right Side: Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: isSmallScreen ? 3 : 6,
            height: '100%',
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logoImage}
            alt="Logo"
            sx={{ width: 80, height: 'auto', marginBottom: 3 }}
          />

          {/* Title */}
          <Typography
            variant={isSmallScreen ? 'h5' : 'h4'}
            sx={{ fontWeight: 'bold', color: '#0B3C5D', marginBottom: 1, textAlign: 'center' }}
          >
            SINN سن
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', marginBottom: 4, textAlign: 'center', fontWeight: 500 }}
          >
            Become part of something great. Sign in
          </Typography>

          {/* Error Message */}
          {error && (
            <Typography variant="body1" sx={{ color: 'red', marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Form */}
          <Box
            component="form"
            sx={{
              width: '100%',
              maxWidth: 350,
            }}
          >
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue="+966565656561"
              InputProps={{
                style: { backgroundColor: '#f9f9f9' },
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
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
                style: { backgroundColor: '#f9f9f9' },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                marginTop: 2,
                backgroundColor: '#0B3C5D',
                color: '#fff',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#06283D' },
              }}
            >
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
