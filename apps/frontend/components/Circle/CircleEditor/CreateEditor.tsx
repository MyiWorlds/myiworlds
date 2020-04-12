import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

export default function CircleEditor() {
  const classes = useStyles();

  return <div className={classes.root}>Circle Editor</div>;
}
