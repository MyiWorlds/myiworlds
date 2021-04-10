import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import SaveCircle from './SaveCircle';
import SaveCircleButton from './SaveCircleButton';
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';

interface Props {
  id: string;
  initialIsEditing: boolean;
  editor: React.ElementType;
  viewer: React.ElementType;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    btn: {
      margin: theme.spacing(1),
    },
    appBar: {},
    toolbar: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  }),
);

export default function CircleEditor({
  id,
  initialIsEditing,
  editor,
  viewer,
}: Props) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(initialIsEditing);

  const Editor = editor;
  const Viewer = viewer;
  console.log('editor re rendered');

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} color="transparent">
        <Toolbar className={classes.toolbar} variant="dense">
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
          <SaveCircleButton id={id} />
        </Toolbar>
      </AppBar>
      <div>
        {isEditing ? (
          <Editor isEditing={isEditing} />
        ) : (
          <Viewer isEditing={isEditing} />
        )}
      </div>
    </div>
  );
}
