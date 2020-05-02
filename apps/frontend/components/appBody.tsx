import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
});

const AppBody = ({ children }: any) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default AppBody;
