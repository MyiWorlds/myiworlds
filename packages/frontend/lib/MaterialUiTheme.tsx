import React from 'react';
import { createMuiTheme, makeStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// I should be able to copy most of what they did at mui
// https://github.com/mui-org/material-ui/blob/master/docs/src/modules/components/ThemeContext.js

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

const useStyles = makeStyles((theme: Theme) => {
  return {
    app: {
      position: 'fixed',
      height: '100%',
      width: '100%',
      background: theme.palette.background.paper,
    },
    root: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      width: '100%',
    },
  };
});

const App = ({ children }: { children: any }) => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.root}>{children}</div>
    </div>
  );
};

const MaterialUiTheme = ({ children }: { children: any }) => {
  return (
    <ThemeProvider theme={outerTheme}>
      <App>{children}</App>
    </ThemeProvider>
  );
};

export default MaterialUiTheme;
