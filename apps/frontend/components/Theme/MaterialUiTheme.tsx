import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import defaultMUITheme from './defaultMUITheme';
import ErrorBoundary from './../ErrorBoundry/ErrorBoundary';
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
  setCanSave?: (bool: boolean) => void;
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

const MaterialUiTheme = ({ themeOverride, children, setCanSave }: Props) => {
  const classes = useStyles();

  let theme = defaultMUITheme;
  if (themeOverride) {
    theme = createMuiTheme(themeOverride);

    const backupThemeDisplay = (
      <ThemeProvider theme={responsiveFontSizes(defaultMUITheme)}>
        <CssBaseline />
        <Card className={classes.appRoot}>{children}</Card>
      </ThemeProvider>
    );
    return (
      <ErrorBoundary
        backupErrorRenderComponent={backupThemeDisplay}
        setCanSave={setCanSave}
      >
        <ThemeProvider theme={responsiveFontSizes(theme)}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MaterialUiTheme;
