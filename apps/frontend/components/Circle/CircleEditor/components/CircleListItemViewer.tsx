import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { Circle } from '@myiworlds/types';
import { useGetCircleByIdQuery } from './../../../../generated/apolloComponents';
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

export default function CircleListItemViewer({ id }: Props) {
  const {
    data: getCircleQuery,
    loading: loadingGetCircle,
    error: errorGettingCircle,
  } = useGetCircleByIdQuery({
    skip: !id,
    variables: {
      id,
    },
  });

  console.log(loadingGetCircle, errorGettingCircle);

  let circle = null;

  if (errorGettingCircle) {
    return null;
  }

  if (loadingGetCircle) {
    return (
      <ListItem
        button
        // onClick={() => onSelect(profile.id)}
        key={id}
      >
        <ListItemAvatar>
          <Avatar>
            <Skeleton variant="circle" width={40} height={40} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<Skeleton variant="text" />} />
      </ListItem>
    );
  }

  if (getCircleQuery && getCircleQuery.getCircleById) {
    circle = getCircleQuery.getCircleById as Circle;
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
  } else {
    return null;
  }
}
