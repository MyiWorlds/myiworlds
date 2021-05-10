import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import StringEditor from './StringEditor';
import StringViewer from './StringViewer';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Circle } from '@myiworlds/types';
import {
  createStyles,
  IconButton,
  makeStyles,
  TextFieldProps,
  Theme,
} from '@material-ui/core';

interface Props {
  parentIsEditing: boolean;
  property: keyof Circle;
  circleId: string;
  textFieldProps: TextFieldProps;
  stringProperties: React.HTMLAttributes<HTMLSpanElement>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stringContainer: {
      width: '100%',
      height: '100%',
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

export default function String({
  circleId,
  parentIsEditing,
  property,
  textFieldProps,
  stringProperties,
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
    <div className={classes.stringContainer}>
      <StringEditor
        property={property}
        circleId={circleId}
        textFieldProps={textFieldProps}
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
    <div className={classes.stringContainer} onDoubleClick={handleSetEditing}>
      <StringViewer
        property={property}
        circleId={circleId}
        stringProperties={stringProperties}
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
