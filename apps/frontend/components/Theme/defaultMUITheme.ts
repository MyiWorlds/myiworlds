import { createMuiTheme } from '@material-ui/core/styles';

const defaultMUITheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    type: 'dark',
  },
});

export default defaultMUITheme;
