import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#5D87FF',
      light: '#8EB5FF',
      dark: '#3751C6',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#49BEFF',
      light: '#7BD4FF',
      dark: '#2F9FDB',
      contrastText: '#0B1020',
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
      50: '#111827',
      100: '#1F2937',
      200: '#374151',
      300: '#4B5563',
      400: '#6B7280',
      500: '#9CA3AF',
      600: '#D1D5DB',
      700: '#E5E7EB',
      800: '#F3F4F6',
      900: '#F9FAFB',
    },
    background: {
      default: '#050816',
      paper: '#0B1020',
    },
    text: {
      primary: '#E5E7EB',
      secondary: '#9CA3AF',
      disabled: '#6B7280',
    },
    divider: 'rgba(148, 163, 184, 0.38)',
  },
  typography: {
    fontFamily:
      '"Public Sans", -apple-system,BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            'radial-gradient(circle at top, rgba(93,135,255,0.22), transparent 55%), radial-gradient(circle at bottom, rgba(73,190,255,0.16), transparent 55%), #050816',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          backgroundColor: t.palette.background.paper,
          backgroundImage: 'linear-gradient(135deg, rgba(148,163,184,0.14), transparent 55%)',
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          backgroundColor: t.palette.background.paper,
          backgroundImage: 'linear-gradient(135deg, rgba(93,135,255,0.26), rgba(11,16,32,0.9))',
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          borderRadius: t.shape.borderRadius,
          boxShadow: '0 10px 30px rgba(15,23,42,0.75)',
        }),
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #5D87FF, #49BEFF)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: () => ({
          backgroundImage: 'linear-gradient(90deg, #5D87FF, #49BEFF)',
          boxShadow: '0 14px 40px rgba(15,23,42,0.9)',
        }),
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: () => ({
          height: 3,
          borderRadius: 999,
          backgroundImage: 'linear-gradient(90deg, #5D87FF, #49BEFF)',
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            color: t.palette.primary.light,
          },
        }),
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme: t }) => ({
          '& .MuiTableCell-root': {
            backgroundColor: 'rgba(15,23,42,0.95)',
            color: t.palette.text.secondary,
            borderBottomColor: t.palette.divider,
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: () => ({
          '&:nth-of-type(odd) .MuiTableCell-root': {
            backgroundColor: 'rgba(15,23,42,0.85)',
          },
          '&:nth-of-type(even) .MuiTableCell-root': {
            backgroundColor: 'rgba(15,23,42,0.8)',
          },
          '&:hover .MuiTableCell-root': {
            backgroundColor: 'rgba(93,135,255,0.24)',
          },
        }),
      },
    },
  },
})

export default theme
