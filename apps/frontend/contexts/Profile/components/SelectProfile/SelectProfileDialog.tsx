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
import { CreatedProfile } from '@myiworlds/types';
import { Icon } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Profile } from '@myiworlds/types';
import { useGetUserProfilesLazyQuery } from '../../../../generated/apolloComponents';
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
  const [profiles, setProfiles] = useState<Profile[]>([guestProfile]);
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
        <Typography variant="h6">Create Profile</Typography>
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
      <DialogTitle id="simple-dialog-title">Select Profile</DialogTitle>
      <DialogContent>
        <List>
          {profiles &&
            profiles.map((profile: CreatedProfile) => (
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
          New Profile
        </Button>
      </DialogActions>
    </Dialog>
  );

  const onDataChange = () => {
    if (getUserProfilesQuery && getUserProfilesQuery?.getUserProfiles && getUserProfilesQuery.getUserProfiles.length) {
      setProfiles(getUserProfilesQuery?.getUserProfiles as Profile[])
    } else {
      if (!profiles.length) {
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
