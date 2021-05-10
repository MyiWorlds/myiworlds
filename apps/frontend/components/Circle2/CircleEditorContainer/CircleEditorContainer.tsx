import Button from '@material-ui/core/Button';
import CircleField from './components/CircleField';
import React, { useEffect, useState } from 'react';
import SaveCircle from './components/SaveCircle';
import SaveCircleButton from './components/SaveCircleButton';
import { CircleHydrated } from '../../../../../libs/types/src/circle';
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
} from '@material-ui/core';

interface Props {
  fetch?: boolean;
  circle: CircleHydrated;
  initialIsEditing: boolean;
}

// Shouldnt this be determined by the layout for fields shown
const fieldsDisplayed = [
  'type',
  'parent',
  'cached',
  'cache',
  'pii',
  'clonedFrom',
  'copiedFrom',
  'copiedFromClone',
  'autoUpdate',
  'slug',
  'public',
  'passwordRequired',
  'tags',
  'title',
  'subtitle',
  'description',
  'media',
  'creator',
  'owner',
  'viewers',
  'editors',
  'ui',
  'layouts',
  'dateCreated',
  'dateUpdated',
  'key',
  'string',
  'data',
  'number',
  'bigNumber',
  'boolean',
  'date',
  'geoPoint',
  'line',
  'lines',
];

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

export default function CircleEditorContainer({
  circle,
  fetch,
  initialIsEditing,
}: Props) {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const fetchCircle = () => {
    if (fetch) {
      console.log('Fetch the circle');
    }
  };
  useEffect(fetchCircle, [fetch]);

  console.log('Editor re-rendered');

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
          <SaveCircleButton id={circle.id} />
        </Toolbar>
      </AppBar>
      <div>
        {fieldsDisplayed.map((field: keyof CircleHydrated) => (
          <CircleField
            key={circle.id + field}
            field={field}
            isEditing={initialIsEditing}
            circle={circle}
          />
        ))}
      </div>
    </div>
  );
}
