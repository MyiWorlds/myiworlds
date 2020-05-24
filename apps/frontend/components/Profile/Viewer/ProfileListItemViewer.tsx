import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { PublicProfileData } from '@myiworlds/types';
import { useGetPublicProfileByIdQuery } from './../../../generated/apolloComponents';
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

const ProfileListItemViewer = React.memo(({ id }: Props) => {
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
    console.log('Error getting profile.');
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
    console.log('Profile list item rerendered.');
    profile = getPublicProfileQuery.getPublicProfileById as PublicProfileData;

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
});

export default ProfileListItemViewer;
