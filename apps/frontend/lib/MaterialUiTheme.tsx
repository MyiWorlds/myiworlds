import defaultMUITheme from './defaultMUITheme';
import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

const MaterialUiTheme = ({ children }: { children: any }) => {
  return <ThemeProvider theme={defaultMUITheme}>{children}</ThemeProvider>;
};

export default MaterialUiTheme;
