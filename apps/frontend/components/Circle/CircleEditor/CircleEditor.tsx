import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Error from '../../Error';
import firestoreClient from './../../../lib/firebase/firestoreClient';
import IconButton from '@material-ui/core/IconButton';
import Progress from './../../Progress/Progress';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { useDocument } from 'react-firebase-hooks/firestore';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

interface Props {
  id: string;
}

export default function CircleEditor({ id }: Props) {
  const classes = useStyles();
  const [circleData, loadingCircle, errorCircle] = useDocument(
    firestoreClient.collection(FIRESTORE_COLLECTIONS.CIRCLES).doc(id),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  if (errorCircle) {
    return <Error error={errorCircle} />;
  }

  if (loadingCircle) {
    return <Progress />;
  }

  if (circleData) {
    const circle = circleData.data();

    if (circle) {
      return (
        <div className={classes.root}>
          <AppBar className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                // onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {circle.title || 'Untitled'}
              </Typography>
              <Button
                autoFocus
                color="inherit"
                // onClick={handleClose}
              >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div>
            {circle && (
              <div>
                <span>Document:</span>
                <span>{JSON.stringify(circle)}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
  return null;
}
