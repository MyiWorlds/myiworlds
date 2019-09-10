import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const outerTheme = createMuiTheme({
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

const MaterialUiTheme = ({ children }: { children: any }) => {
  return <ThemeProvider theme={outerTheme}>{children}</ThemeProvider>;
};

export default MaterialUiTheme;
