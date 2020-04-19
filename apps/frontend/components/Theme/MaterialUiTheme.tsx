import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import defaultMUITheme from './defaultMUITheme';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  makeStyles,
  Theme,
  responsiveFontSizes,
  createStyles,
  ThemeProvider,
} from '@material-ui/core/styles';

interface Props {
  children: React.ReactElement;
  themeOverride?: Theme;
}

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

const MaterialUiTheme = ({ themeOverride, children }: Props) => {
  const classes = useStyles();

  let theme = defaultMUITheme;
  if (themeOverride) {
    theme = createMuiTheme(themeOverride);
  }

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <Card className={classes.appRoot}>{children}</Card>
    </ThemeProvider>
  );
};

export default MaterialUiTheme;
