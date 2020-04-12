import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from '../../../components/Header/Header';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Media from './../../Media/Media';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { ProfileContext } from '../../../contexts/Profile/ProfileContext';
import { UserContext } from '../../../contexts/User/UserContext';

const User = () => {
  const { user, handleLogout, handleDeleteAccount } = useContext(UserContext);
  const { selectedProfile } = useContext(ProfileContext);
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

      <Typography variant="h4">Selected CreatedProfile:</Typography>
      <Card>
        <Header
          media={
            <Avatar>
              <Media circle={selectedProfile.media} />
            </Avatar>
          }
          title={selectedProfile.username}
        />
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
