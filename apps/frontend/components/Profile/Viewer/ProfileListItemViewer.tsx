import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { useGetPublicProfileByIdQuery } from './../../../generated/apolloComponents';
import { UserProfileData } from '@myiworlds/types';
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

export default function ProfileListItemViewer({ id }: Props) {
  const {
    data: getPublicProfileQuery,
    loading: loadingGetProfile,
    error: errorGettingProfile,
  } = useGetPublicProfileByIdQuery({
    skip: !id,
    variables: {
      id,
    },
  });

  if (errorGettingProfile) {
    return null;
  }

  if (loadingGetProfile) {
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
  let profile = null;

  if (getPublicProfileQuery && getPublicProfileQuery.getPublicProfileById) {
    profile = getPublicProfileQuery.getPublicProfileById as UserProfileData;

    return (
      <ListItem
        button
        // onClick={() => onSelect(profile.id)}
        key={profile.id}
      >
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={profile.username} />
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
