import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import { CircleClone } from '@myiworlds/types';
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
  id: string;
}

const CircleHistoryEditor = React.memo(({ id }: Props) => {
  const {
    data: getCircleClonesQuery,
    loading: loadingGetCircleClones,
    error: errorGettingCircleClones,
  } = useGetCircleClonesByIdQuery({
    skip: !id || !id.length,
    variables: {
      id,
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
        {circles.map((circle: CircleClone) => {
          return (
            <ListItem
              button
              // onClick={() => onSelect(profile.id)}
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
              <ListItemSecondaryAction>
                <IconButton>
                  <RestorePageIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return null;
  }
});

export default CircleHistoryEditor;
