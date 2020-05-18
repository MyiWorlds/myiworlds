import CloudDoneIcon from '@material-ui/icons/CloudDone';
import ContentSizeChanger from './components/ContentSizeChanger';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import HistoryIcon from '@material-ui/icons/History';
import Progress from './../../Progress/Progress';
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
    progressIcon: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      position: 'relative',
    },
  }),
);

interface Props {
  circle: Circle;
  isSaving: boolean;
  handleFinished: () => void;
  setViewingHistory: (boolean: boolean) => void;
  setEditingGrid: (boolean: boolean) => void;
  updateControllerAndViewer: () => void;
  hasUnsavedChanges: boolean;
  viewingHistory: boolean;
  displaySize: null | number;
  setDisplaySize: (newSize: null | number) => void;
  handleGoBack: () => void;
}

export default function CircleEditorAppBarItems({
  circle,
  isSaving,
  handleFinished,
  setViewingHistory,
  updateControllerAndViewer,
  viewingHistory,
  setEditingGrid,
  displaySize,
  setDisplaySize,
  hasUnsavedChanges,
  handleGoBack,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>
      {circle.type !== 'THEME' && (
        <>
          <ContentSizeChanger
            displaySize={displaySize}
            setDisplaySize={setDisplaySize}
          />
          <Tooltip title="Edit grid layout">
            <IconButton
              edge="start"
              className={classes.appBarBtn}
              color="inherit"
              aria-label="menu"
              onClick={() => setEditingGrid(true)}
            >
              <DashboardIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      {viewingHistory ? (
        <IconButton
          edge="start"
          className={classes.appBarBtn}
          color="inherit"
          aria-label="menu"
          onClick={() => {
            setViewingHistory(false);
            updateControllerAndViewer();
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
      {isSaving ? (
        <Tooltip title="Saving circle">
          <div className={classes.progressIcon}>
            <Progress hideBackground size={24} color={'inherit'} />
          </div>
        </Tooltip>
      ) : (
        <Tooltip title="Circle saved and up to date">
          <CloudDoneIcon className={classes.appBarBtn} />
        </Tooltip>
      )}

      <Button
        color="inherit"
        onClick={handleGoBack}
        disabled={isSaving || hasUnsavedChanges}
        className={classes.appBarBtn}
      >
        Back
      </Button>

      <Button
        autoFocus
        color="primary"
        onClick={handleFinished}
        disabled={isSaving || hasUnsavedChanges}
        variant="contained"
      >
        Finished
      </Button>
    </>
  );
}
