import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonLink from '../../../../ButtonLink';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Error from '../../../../Error';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Media from './../../../../Media/Media';
import ProgressWithMessage from './../../../../ProgressWithMessage/ProgressWithMessage';
import React from 'react';
import { CircleHydrated } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  useGetSeededCirclesByIdsQuery,
  useSeedFirestoreCirclesMutation,
} from './../../../../../generated/apolloComponents';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    button: {
      margin: '0px auto',
    },
    root: {
      width: '100%',
      minHeight: 100,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const SeedFirestore: React.FunctionComponent<Props> = () => {
  const classes = useStyles();
  const {
    data: getSeededCirclesByIdsQuery,
    loading: getSeededCirclesByIdsLoading,
    error: getSeededCirclesByIdsError,
  } = useGetSeededCirclesByIdsQuery({
    fetchPolicy: 'no-cache',
  });

  const [
    seedFirestoreCircles,
    {
      data: seedFirestoreCirclesData,
      loading: seedFirestoreCirclesLoading,
      error: seedFirestoreCirclesError,
    },
  ] = useSeedFirestoreCirclesMutation();

  console.log(
    seedFirestoreCirclesData,
    seedFirestoreCirclesLoading,
    seedFirestoreCirclesError,
  );

  let list = null;

  if (getSeededCirclesByIdsError) {
    list = (
      <Error
        error={getSeededCirclesByIdsError}
        message="There was an error getting the default Circles, try again."
      />
    );
  } else if (getSeededCirclesByIdsLoading) {
    list = <ProgressWithMessage message="Loading default Circles" />;
  } else if (
    getSeededCirclesByIdsQuery &&
    getSeededCirclesByIdsQuery.getSeededCirclesByIds
  ) {
    list = getSeededCirclesByIdsQuery.getSeededCirclesByIds.map(
      (circle: CircleHydrated) => {
        return (
          <ListItem
            button
            key={circle.id}
            component={ButtonLink}
            href={`/id/[id]?id=${circle.id}`}
            as={`/id/${circle.id}`}
          >
            <ListItemAvatar>
              <Avatar>
                {circle.media ? (
                  <Media circle={circle.media} />
                ) : (
                  <FiberManualRecordIcon />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={circle.title} />
          </ListItem>
        );
      },
    );
  }

  return (
    <Card>
      <CardHeader
        title="Seed Firestore"
        subheader="This will add default data to Firestore or update existing"
      />
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => seedFirestoreCircles()}
        >
          Seed
        </Button>
      </CardActions>
      <CardContent>
        <List className={classes.root}>{list}</List>
      </CardContent>
    </Card>
  );
};

export default SeedFirestore;
