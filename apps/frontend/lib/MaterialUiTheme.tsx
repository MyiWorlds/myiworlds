import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import defaultMUITheme from './defaultMUITheme';
import React from 'react';
import {
  makeStyles,
  Theme,
  responsiveFontSizes,
  createStyles,
  ThemeProvider,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appRoot: {
      width: '100%',
      height: '100%',
      border: 0,
      borderRadius: 0,
      boxShadow: 'unset',
    },
  }),
);

const MaterialUiTheme = ({ children }: { children: any }) => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={responsiveFontSizes(defaultMUITheme)}>
      <CssBaseline />
      <Card className={classes.appRoot}>{children}</Card>
    </ThemeProvider>
  );
};

export default MaterialUiTheme;
