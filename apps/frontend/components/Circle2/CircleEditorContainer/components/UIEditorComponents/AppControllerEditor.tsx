import React from 'react';
import SaveCircleButton from '../SaveCircleButton';
import {
  Button,
  createStyles,
  makeStyles,
  Theme
  } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filler: {
      flexGrow: 1,
    },
    btn: {
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  circleId: string;
  viewingHistory: boolean;
  setViewingHistory: (val: boolean) => void;
}

export default function AppControllerEditor({
  isEditing,
  setIsEditing,
  circleId,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.filler} />
      {isEditing ? (
        <Button
          className={classes.btn}
          variant="contained"
          onClick={() => setIsEditing(false)}
        >
          View
        </Button>
      ) : (
        <Button
          className={classes.btn}
          variant="contained"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </Button>
      )}
      <SaveCircleButton id={circleId} />
    </>
  );
}
