import CopyCircle from './../../shared/CopyCircle/CopyCircle';
import React from 'react';
import RestorePageIcon from '@material-ui/icons/RestorePage';
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
  updateCircleLoading: boolean;
  handleSave: () => void;
  setViewingHistory: (boolean: boolean) => void;
  canSave: boolean;
  viewingClone: boolean;
  viewingId: string;
}

export default function CircleHistoryAppBarItems({
  updateCircleLoading,
  handleSave,
  setViewingHistory,
  canSave,
  viewingClone,
  viewingId,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        History
      </Typography>
      {viewingClone && (
        <CopyCircle
          id={viewingId}
          collection={viewingClone ? 'circles-clones' : 'circles'}
        />
      )}
      <Button
        className={classes.appBarBtn}
        disabled={updateCircleLoading || !canSave}
        onClick={() => setViewingHistory(false)}
      >
        Cancel
      </Button>
      {viewingClone && (
        <Button
          autoFocus
          color="primary"
          onClick={handleSave}
          disabled={updateCircleLoading || !canSave}
          variant="contained"
          startIcon={<RestorePageIcon />}
        >
          Restore
        </Button>
      )}
    </>
  );
}
