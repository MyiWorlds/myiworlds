import ContentSizeChanger from './../../Circle/CircleEditor/components/ContentSizeChanger';
import React from 'react';
import { Circle } from '@myiworlds/types';
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
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

interface Props {
  circle: Circle;
  updateLayoutCircle: () => void;
  displaySize: null | number;
  setDisplaySize: (newSize: null | number) => void;
  editingGrid: boolean;
  isSaving: boolean;
  handleCancel: () => void;
}

export default function CircleGridLayoutAppBarItems({
  circle,
  displaySize,
  setDisplaySize,
  editingGrid,
  updateLayoutCircle,
  isSaving,
  handleCancel,
}: Props) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>

      <ContentSizeChanger
        displaySize={displaySize}
        setDisplaySize={setDisplaySize}
        editingGrid={editingGrid}
      />

      <Button
        autoFocus
        color="inherit"
        onClick={handleCancel}
        disabled={isSaving}
      >
        Cancel
      </Button>

      <Button
        autoFocus
        color="inherit"
        onClick={updateLayoutCircle}
        disabled={isSaving}
      >
        Save
      </Button>
    </>
  );
}
