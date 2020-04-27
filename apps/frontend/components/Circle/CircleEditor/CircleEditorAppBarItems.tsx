import React from 'react';
import { Circle } from '@myiworlds/types';
import { useRouter } from 'next/router';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    appBarBtn: {
      marginRight: theme.spacing(2),
    },
  }),
);

interface Props {
  circle: Circle;
  updateCircleLoading: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  canSave: boolean;
}

export default function CircleEditorAppBarItems({
  circle,
  updateCircleLoading,
  handleSave,
  handleCancel,
  canSave,
}: Props) {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>
      <Button
        autoFocus
        color="inherit"
        onClick={handleCancel}
        disabled={updateCircleLoading}
        className={classes.appBarBtn}
      >
        Cancel
      </Button>
      <Button
        autoFocus
        color="primary"
        onClick={handleSave}
        disabled={updateCircleLoading || !canSave}
        variant="contained"
      >
        Save
      </Button>
    </>
  );
}
