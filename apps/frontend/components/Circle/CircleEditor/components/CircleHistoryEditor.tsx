import CircleListItemViewer from './CircleListItemViewer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import Tooltip from '@material-ui/core/Tooltip';
import { Circle, CircleClone } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { format } from 'date-fns';
import { useGetCircleClonesByIdQuery } from '../../../../generated/apolloComponents';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

interface Props {
  circleId: string;
  clonedCircleIdViewing: string | null;
  updateCircleToFetch: (
    newId: string | null,
    newCollection: 'circles' | 'circles-clones' | null,
  ) => void;
  handleSave: () => void;
  contentCircle: CircleClone | Circle;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    currentCircle: {
      background: theme.palette.primary.main,
    },
    listItemText: {
      color: theme.palette.text.primary,
    },
  }),
);

const CircleHistoryEditor = React.memo(
  ({
    circleId,
    clonedCircleIdViewing,
    updateCircleToFetch,
    handleSave,
    contentCircle,
  }: Props) => {
    const classes = useStyles();

    const {
      data: getCircleClonesQuery,
      loading: loadingGetCircleClones,
      error: errorGettingCircleClones,
    } = useGetCircleClonesByIdQuery({
      skip: !circleId || circleId === '',
      variables: {
        id: circleId,
      },
    });

    if (errorGettingCircleClones) {
      console.log('There was an error getting the list of circles.');
      return null;
    }

    if (loadingGetCircleClones) {
      console.log('Loading circle history clones');
      return null;
    }

    if (getCircleClonesQuery && getCircleClonesQuery.getCircleClonesById) {
      console.log('Circles list viewer rendered.');
      const circles = getCircleClonesQuery.getCircleClonesById
        .clones as CircleClone[];
      return (
        <List>
          <CircleListItemViewer
            id={circleId}
            secondary={'Current'}
            listItemClasses={{
              root: classes.currentCircle,
            }}
            listItemTextClasses={{
              root: classes.listItemText,
              primary: classes.listItemText,
            }}
            selected={true}
            onSelect={() =>
              contentCircle.id === circleId
                ? {}
                : updateCircleToFetch(circleId, FIRESTORE_COLLECTIONS.CIRCLES)
            }
          />
          {circles.map((circle: CircleClone) => {
            return (
              <ListItem
                button
                selected={clonedCircleIdViewing === circle.id}
                onClick={() =>
                  updateCircleToFetch(
                    circle.id,
                    FIRESTORE_COLLECTIONS.CIRCLES_CLONES,
                  )
                }
                key={circle.id}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={circle.title}
                  secondary={format(
                    circle.dateUpdated as number,
                    'MMMM dd, yyyy h:mm a',
                  )}
                />
                {clonedCircleIdViewing === circle.id && (
                  <ListItemSecondaryAction>
                    <Tooltip title="Restore to latest">
                      <IconButton onClick={() => handleSave()}>
                        <RestorePageIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            );
          })}
        </List>
      );
    } else {
      return null;
    }
  },
);

export default CircleHistoryEditor;
