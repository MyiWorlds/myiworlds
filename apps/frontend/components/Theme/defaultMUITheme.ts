import { createMuiTheme } from '@material-ui/core/styles';

const defaultMUITheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f44336',
    },
    type: 'dark',
  },
});

export default defaultMUITheme;
