import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import DeleteAccountModal from './DeleteAccountModal';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from '../../components/Header/Header';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import React, { useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { UserContext } from '../../contexts/User/UserContext';
import { useRouter } from 'next/router';

const User = () => {
  const { user, handleLogout, handleDeleteAccount } = useContext(UserContext);
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

      <DeleteAccountModal
        open={openDeleteAccountModal}
        handleCancel={handleCloseDeleteAccountModal}
        handleDelete={handleDeleteAccount}
      />
    </Container>
  );
};

export default User;
