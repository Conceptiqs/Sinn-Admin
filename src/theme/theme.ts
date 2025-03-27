// src/theme/theme.ts
import { createTheme } from '@mui/material/styles';
import '@fontsource/kanit'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e', // Customize as needed
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Kanit', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 300 },
    h2: { fontSize: '2rem', fontWeight: 300 },
    h3: { fontSize: '1.75rem', fontWeight: 300 },
    h4: { fontSize: '1.5rem', fontWeight: 300 },
    h5: { fontSize: '1.25rem', fontWeight: 300 },
    h6: { fontSize: '1rem', fontWeight: 300 },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for all buttons
          textTransform: 'none', // Disable uppercase text
          padding: '10px 20px', // Custom padding
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '16px', // Global container padding
        },
      },
    },
  },
});

export default theme;
