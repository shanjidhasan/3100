import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const yellow = '#FFCB05'
const gray = '#5f5c55d6'
const lightGray = '#F3F4ED'
const ghostWhite = '#F9F9F9'
const black = '#000000'


// Create a theme instance.
const theme = createTheme({
  palette: {
    common: { 
      yellow: yellow,
      gray: gray,
      lightGray: lightGray,
      ghostWhite: ghostWhite,
      black: black,
    },
    primary: {
      main: `${gray}`,
    },
    secondary: {
      main: `${yellow}`,
    },
    tertiary: {
      main: '#505050',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: lightGray,
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    button: {
      textTransform: 'capitalize',
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      md: 600,
      lg: 900,
      xl: 1200
    }
  }
});

export default theme;