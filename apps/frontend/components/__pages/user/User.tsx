import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonLink from '../../ButtonLink';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Header from '../../../components/Header/Header';
import HistoryIcon from '@material-ui/icons/History';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Media from './../../Media/Media';
import ProfileSelector from './ProfileSelector';
import React, { useContext } from 'react';
import Router from 'next/router';
import Spacer from './../../Spacer/Spacer';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction } from '@material-ui/core';
import { ProfileContext } from '../../../contexts/Profile/ProfileContext';
import { UserContext } from '../../../contexts/User/UserContext';

const User = () => {
  const { user, handleLogout, handleDeleteAccount } = useContext(UserContext);
  const { selectedProfile, updateSelectedProfileAddToHistory } = useContext(
    ProfileContext,
  );
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = React.useState(
    false,
  );

  const handleClickOpen = () => {
    setOpenDeleteAccountModal(true);
  };

  const handleCloseDeleteAccountModal = () => {
    setOpenDeleteAccountModal(false);
  };

  const logoutBtn = (
    <Button
      key="logout"
      onClick={() => handleLogout()}
      startIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );

  const deleteAccountBtn = (
    <Button
      key="delete"
      variant="contained"
      color="secondary"
      onClick={() => handleClickOpen()}
      startIcon={<DeleteIcon />}
    >
      Delete Account
    </Button>
  );

  const currentTheme =
    selectedProfile.theme &&
    selectedProfile.theme.palette &&
    selectedProfile.theme.palette.type
      ? selectedProfile.theme.palette.type
      : 'dark';
  const darkTheme = currentTheme === 'dark';
  const handleToggleDarkTheme = () => {
    console.log('Update Circle code needs to be written');
  };

  if (!selectedProfile || selectedProfile.id === 'guest') {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Header
        title={user.email}
        media={
          user.photoURL ? (
            <Avatar src={user.photoURL} />
          ) : (
            <Avatar>
              <AccountCircleIcon style={{ width: '100%', height: '100%' }} />
            </Avatar>
          )
        }
        dateCreated={user.dateCreated}
        actions={user.id ? [logoutBtn, deleteAccountBtn] : undefined}
      />

      <Spacer multiplier={4} />

      <Typography variant="h5">Selected Profile:</Typography>
      <Spacer />
      <Card>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar>
                <Media circle={selectedProfile.media} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={selectedProfile.username} />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemIcon>
              <InvertColorsIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-dark-theme"
              primary="Dark Theme"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleToggleDarkTheme}
                checked={darkTheme}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-dark-theme',
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem
            button
            component={ButtonLink}
            href={`/edit/[id]?id=${selectedProfile.theme.id}`}
            as={`/edit/${selectedProfile.theme.id}`}
          >
            <ListItemIcon>
              <Avatar>
                <EditIcon />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Edit Theme" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText
              id="switch-list-label-dark-theme"
              primary="Add to History"
              secondary="Things you do in the application will be added to your history"
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={updateSelectedProfileAddToHistory}
                checked={selectedProfile.addToHistory}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-dark-theme',
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Card>

      <Spacer multiplier={4} />

      <Typography variant="h5">All Profiles:</Typography>
      <Spacer />
      <Card>
        <ProfileSelector />
      </Card>

      <DeleteAccountModal
        open={openDeleteAccountModal}
        handleCancel={handleCloseDeleteAccountModal}
        handleDelete={handleDeleteAccount}
      />
    </Container>
  );
};

export default User;
