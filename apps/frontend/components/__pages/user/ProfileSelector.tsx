import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CreateProfile from './../../../contexts/Profile/components/CreateProfile/CreateProfile';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Error from '../../Error';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Media from './../../Media/Media';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Progress from './../../Progress/Progress';
import React, { useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ProfileContext } from './../../../contexts/Profile/ProfileContext';
import { useGetUserProfilesLazyQuery } from '../../../generated/apolloComponents';
import { UserProfileHydrated } from '@myiworlds/types';

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
  createProfileBtn: {
    textAlign: 'center',
    margin: theme.spacing(2)
  }
}));

const ProfileSelector = () => {
  const classes = useStyles();
  const [getProfiles, {loading:  getUserProfilesLoading, data: getUserProfilesQuery, error: getUserProfilesError}] = useGetUserProfilesLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const { selectedProfile, handleSelectProfile } = useContext(ProfileContext);
  const [showCreateProfile, setShowCreateProfile] = useState(false);

  useEffect(getProfiles, [])

  let content = null;

  if (getUserProfilesLoading) {
    content = <Progress />
  }

  if (getUserProfilesError) {
    content = (
      <Error
      error={getUserProfilesError}
      message={'There was an error getting the Users profiles.'}
    />
    )
  }

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

  if (getUserProfilesQuery && getUserProfilesQuery?.getUserProfiles && getUserProfilesQuery.getUserProfiles.length) {
    const profiles = getUserProfilesQuery.getUserProfiles as UserProfileHydrated[];
    content = (
      <>
      <List>
        {profiles.map((profile: UserProfileHydrated) => (
              <ListItem
                button
                onClick={() => handleSelectProfile(profile.id)}
                key={profile.id}
                selected={profile.id === selectedProfile.id}
              >
                {profile.media && (
                  <ListItemAvatar>
                  <Avatar>
                    <Media circle={profile.media} />
                  </Avatar>
                </ListItemAvatar>
                )}
                <ListItemText primary={profile.username} />
              </ListItem>
            ))}
        </List>
        {showCreateProfile && createProfileForm}
        <div
          className={classes.createProfileBtn}
        >
        <Button
          color="primary"
          onClick={() => setShowCreateProfile(true)}
          startIcon={<AddIcon />}
        >
          Create New Profile
        </Button>
        </div>
      </>
    )
  }

  return content;
}

export default ProfileSelector;
