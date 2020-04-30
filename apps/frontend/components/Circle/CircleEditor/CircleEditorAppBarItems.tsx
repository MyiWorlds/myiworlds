import HistoryIcon from '@material-ui/icons/History';
import React from 'react';
import { Circle } from '@myiworlds/types';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  Button,
  IconButton,
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
  handleViewHistory: () => void;
  canSave: boolean;
}

export default function CircleEditorAppBarItems({
  circle,
  updateCircleLoading,
  handleSave,
  handleCancel,
  handleViewHistory,
  canSave,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>
      <IconButton
        edge="start"
        className={classes.appBarBtn}
        color="inherit"
        aria-label="menu"
        onClick={handleViewHistory}
      >
        <HistoryIcon />
      </IconButton>
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
