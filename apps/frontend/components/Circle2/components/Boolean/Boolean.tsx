import BooleanEditor from './BooleanEditor';
import BooleanViewer from './BooleanViewer';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Circle } from '@myiworlds/types';
import {
  createStyles,
  IconButton,
  makeStyles,
  Theme
  } from '@material-ui/core';
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel';

// Move higher up as all filed types need this
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    booleanContainer: {
      margin: theme.spacing(),
    },
    editButton: {
      position: 'absolute',
      right: theme.spacing(),
      top: theme.spacing(),
      transition: 'all',
      transitionDuration: '.25s',
      opacity: 0,
    },
  }),
);

interface Props {
  property: keyof Circle;
  circleId: string;
  formControlLabelProps: FormControlLabelProps;
  parentIsEditing: boolean;
}

export default function Boolean({
  circleId,
  property,
  parentIsEditing,
  formControlLabelProps,
}: Props) {
  const [isEditing, setIsEditing] = useState(parentIsEditing);

  const classes = useStyles();

  const handleSetEditing = () => {
    if (parentIsEditing) {
      setIsEditing(true);
    }
  };

  const handleSetViewing = () => {
    setIsEditing(false);
  };

  return isEditing && parentIsEditing ? (
    <div className={classes.booleanContainer}>
      <BooleanEditor
        property={property}
        circleId={circleId}
        formControlLabelProps={formControlLabelProps}
      />
      <IconButton
        aria-label="view"
        className={classes.editButton}
        onClick={handleSetViewing}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </div>
  ) : (
    <div className={classes.booleanContainer} onDoubleClick={handleSetEditing}>
      <BooleanViewer
        key="viewer"
        property={property}
        circleId={circleId}
        formControlLabelProps={formControlLabelProps}
      />
      {parentIsEditing && (
        <IconButton
          aria-label="view"
          className={classes.editButton}
          onClick={handleSetEditing}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
}
