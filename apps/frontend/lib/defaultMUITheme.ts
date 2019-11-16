import { createMuiTheme } from '@material-ui/core/styles';

const defaultMUITheme = createMuiTheme({
  palette: {
    primary: {
      main: '#e91e63',
    },
    secondary: {
      main: '#f44336',
    },
    type: 'dark',
  },
});

export default defaultMUITheme;
