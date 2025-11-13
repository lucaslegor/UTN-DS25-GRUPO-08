import { createTheme } from '@mui/material/styles';

// Tema de Material UI configurado para usar Inter globalmente
// createTheme crea un tema completo con todas las propiedades por defecto incluyendo pxToRem
// Primero creamos un tema base y luego lo extendemos
const baseTheme = createTheme();

const muiTheme = createTheme({
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    primary: {
      main: '#1e43c0',
      light: '#3d6de2',
      dark: '#1530a0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00bfff',
      light: '#33ccff',
      dark: '#0099cc',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1f2a44',
      secondary: '#6b7280',
    },
  },
  typography: {
    ...baseTheme.typography,
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 1300,
        },
        container: {
          backdropFilter: 'blur(4px)',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 1300,
        },
        backdrop: {
          backdropFilter: 'blur(4px)',
        },
      },
    },
  },
});

export default muiTheme;

