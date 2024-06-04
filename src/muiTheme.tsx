import {createTheme} from '@mui/material/styles';

export const primaryBlue = '#005AA3';
export const darkBlue = '#004277';
export const lightBlue = '#D0E1EE';
export const lightGrey = '#F9F9F9';
export const secondaryTextGrey = '#a6a6a6';
export const darkGrey = '#E1E2E5';
export const tableBackgroundGrey = '#E6E6E6';
export const disabledGrey = '#d2d3d8';
export const red = '#FF4B4B';
export const white = '#fff';
export const black = '#000';

const theme = createTheme({
  palette: {
    primary: {
      main: primaryBlue,
      dark: darkBlue,
      light: lightBlue,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          textTransform: 'none',
        },
      },
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        variant: 'contained',
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(7px)',
          color: black,
          '&::before': {
            content: !CSS.supports('backdrop-filter', 'blur(7px)') && '""',
            position: 'absolute',
            left: '0',
            top: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            filter: 'blur(7px)',
            zIndex: '-1',
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTypography: {
      styleOverrides: {
        h6: {
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          textDecoration: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'white',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: {
          top: 'inherit',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 24px',
        },
      },
    },
  },
});

theme.typography = {
  ...theme.typography,
  body1: {
    ...theme.typography.body1,
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
  },
  subtitle2: {
    ...theme.typography.subtitle2,
    fontSize: 12,
    [theme.breakpoints.up('sm')]: {
      fontSize: 14,
    },
  },
};

export default theme;
