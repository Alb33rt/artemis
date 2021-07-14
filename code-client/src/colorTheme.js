import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6abf69',
      main: '#388e3c',
      dark: '#00600f',
      contrastText: '#fafafa',
    },
    secondary: {
      light: '#ffffff',
      main: '#fffde7',
      dark: '#cccab5',
      contrastText: '#000000',
    },
  },
});

export {theme as Theme};