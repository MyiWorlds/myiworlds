import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import CreateProfile from '../CreateProfile';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Error from '../../../../components/Error';
import guestProfile from '../../guestProfile';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import React, { useEffect, useState } from 'react';
import { blue } from '@material-ui/core/colors';
import { Icon } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useGetUserProfilesLazyQuery } from '../../../../generated/apolloComponents';
import { UserProfileHydrated } from '@myiworlds/types';
import {
  Button,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';

export interface SelectProfileDialogProps {
  onSelect: (profileId: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  btnIcon: {
    marginRight: theme.spacing(),
  },
}));

const SelectProfileDialog = (props: SelectProfileDialogProps) => {
  const classes = useStyles();
  const { onSelect } = props;
  const [profiles, setProfiles] = useState<UserProfileHydrated[]>([guestProfile]);
  const [showCreateProfile, setShowCreateProfile] = useState(
    profiles && profiles.length ? false : true,
  );
  // {
  //   data: getUserProfilesQuery,
  //   loading: getUserProfilesLoading,
  //   error: getUserProfilesError,
  // }
  const [getProfiles, {loading:  getUserProfilesLoading, data: getUserProfilesQuery, error: getUserProfilesError}] = useGetUserProfilesLazyQuery();

  const createProfileForm = (
    <Dialog
      onClose={() => {}}
      aria-labelledby="select-profile-dialog"
      open={showCreateProfile}
      fullWidth={true}
    >
      <MuiDialogTitle disableTypography className={classes.root}>
        <Typography variant="h6">Create CreatedProfile</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => setShowCreateProfile(false)}
        >
          <Icon>close</Icon>
        </IconButton>
      </MuiDialogTitle>
      <DialogContent>
        <CreateProfile onCancel={() => setShowCreateProfile(false)} />
      </DialogContent>
    </Dialog>
  );

  const profilesSelect = (
    <Dialog
      onClose={() => {}}
      aria-labelledby="select-profile-dialog"
      open={!showCreateProfile}
      fullWidth={true}
    >
      <DialogTitle id="simple-dialog-title">Select CreatedProfile</DialogTitle>
      <DialogContent>
        <List>
          {profiles && profiles[0].id !== 'guest' &&
            profiles.map((profile: UserProfileHydrated) => (
              <ListItem
                button
                onClick={() => onSelect(profile.id)}
                key={profile.id}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={profile.username} />
              </ListItem>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setShowCreateProfile(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New CreatedProfile
        </Button>
      </DialogActions>
    </Dialog>
  );

  const onDataChange = () => {
    if (getUserProfilesQuery && getUserProfilesQuery?.getUserProfiles && getUserProfilesQuery.getUserProfiles.length) {
      setProfiles(getUserProfilesQuery?.getUserProfiles as UserProfileHydrated[])
    } else {
      if (!profiles.length || profiles[0].id === 'guest') {
        setShowCreateProfile(true);
      }
    }
  }

  useEffect(getProfiles, [])
  useEffect(onDataChange, [getUserProfilesQuery])

  if (getUserProfilesLoading) {
    return <h1>Loading get Profiles</h1>;
  }

  if (getUserProfilesError) {
    return (
      <Error
        error={getUserProfilesError}
        message={'There was an error getting the '}
      />
    );
  }

  return (
    <>
      {createProfileForm}
      {profilesSelect}
    </>
  );
};

export default SelectProfileDialog;
