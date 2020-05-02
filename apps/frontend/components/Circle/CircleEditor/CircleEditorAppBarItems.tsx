import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
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
  setViewingHistory: (boolean: boolean) => void;
  updateNavItemsAndViewer: () => void;
  canSave: boolean;
  viewingHistory: boolean;
}

export default function CircleEditorAppBarItems({
  circle,
  updateCircleLoading,
  handleSave,
  handleCancel,
  setViewingHistory,
  canSave,
  updateNavItemsAndViewer,
  viewingHistory,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>
      {viewingHistory ? (
        <IconButton
          edge="start"
          className={classes.appBarBtn}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            setViewingHistory(false);
            updateNavItemsAndViewer();
          }}
        >
          <EditIcon />
        </IconButton>
      ) : (
        <Tooltip title="History">
          <IconButton
            edge="start"
            className={classes.appBarBtn}
            color="inherit"
            aria-label="menu"
            onClick={() => setViewingHistory(true)}
          >
            <HistoryIcon />
          </IconButton>
        </Tooltip>
      )}
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
