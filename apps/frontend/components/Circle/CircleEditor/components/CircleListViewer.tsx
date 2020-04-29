import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Circle } from '@myiworlds/types';
import { useGetCirclesByIdsQuery } from '../../../../generated/apolloComponents';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

interface Props {
  ids: string[];
}

export default function CircleListViewer({ ids }: Props) {
  const {
    data: getCirclesQuery,
    loading: loadingGetCircles,
    error: errorGettingCircles,
  } = useGetCirclesByIdsQuery({
    skip: !ids || !ids.length,
    variables: {
      ids,
    },
  });

  console.log(loadingGetCircles, errorGettingCircles);

  if (errorGettingCircles) {
    return null;
  }

  if (loadingGetCircles) {
    return (
      <List>
        {ids.map((id: string) => {
          return (
            <ListItem button key={id}>
              <ListItemAvatar>
                <Avatar>
                  <Skeleton variant="circle" width={40} height={40} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Skeleton variant="text" />} />
            </ListItem>
          );
        })}
      </List>
    );
  }

  if (getCirclesQuery && getCirclesQuery.getCirclesByIds) {
    const circles = getCirclesQuery.getCirclesByIds as Circle[];
    return (
      <List>
        {circles.map((circle: Circle) => {
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
              <ListItemText primary={circle.title} />
              <ListItemSecondaryAction>
                <IconButton>
                  <DeleteIcon />
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
}
