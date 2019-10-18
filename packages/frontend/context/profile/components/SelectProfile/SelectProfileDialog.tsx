import AddIcon from '@material-ui/icons/add';
import Avatar from '@material-ui/core/Avatar';
import CreateProfile from '../CreateProfile';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import React, { useState } from 'react';
import Spacer from '../../../../components/Spacer';
import { blue } from '@material-ui/core/colors';
import { CreatedProfile } from '../../../../../types/src/profile';
import { Icon } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';

export interface SelectProfileDialogProps {
  onSelect: (profileId: string) => void;
  profiles: CreatedProfile[];
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
  const { onSelect, profiles } = props;
  const [showCreateProfile, setShowCreateProfile] = useState(false);

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
      open={true}
      fullWidth={true}
    >
      {' '}
      <DialogTitle id="simple-dialog-title">Select Profile</DialogTitle>
      <DialogContent>
        <List>
          {profiles.map((profile: CreatedProfile) => (
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
        <Spacer />
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setShowCreateProfile(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {createProfileForm}
      {profilesSelect}
    </>
  );
};

export default SelectProfileDialog;
