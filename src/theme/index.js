import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5D87FF',
      light: '#8EB5FF',
      dark: '#4570E6',
      contrastText: '#fff',
    },
    secondary: {
      main: '#49BEFF',
      light: '#7BD4FF',
      dark: '#2F9FDB',
      contrastText: '#fff',
    },
    success: {
      main: '#13DEB9',
      light: '#5AE7C4',
      dark: '#0EB894',
    },
    error: {
      main: '#FA896B',
      light: '#FCAB92',
      dark: '#E66444',
    },
    warning: {
      main: '#FFAE1F',
      light: '#FFC55A',
      dark: '#E69500',
    },
    grey: {
      50: '#F5F7FA',
      100: '#EAEFF4',
      200: '#DFE5EC',
      300: '#7C8FAC',
      400: '#5A6A85',
      500: '#2A3547',
      600: '#1E2B3A',
      700: '#1A2332',
      800: '#151C28',
      900: '#0F1419',
    },
    background: {
      default: '#F5F7FA',
      paper: '#ffffff',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
      disabled: '#7C8FAC',
    },
  },
  typography: {
    fontFamily:
      '"Public Sans", -apple-system,BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
})

export default theme
