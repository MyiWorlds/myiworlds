import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { UserContext } from './../contexts/User/UserContext';

const Index = () => {
  const { user, handleLogin, handleLogout, handleDeleteAccount } = useContext(
    UserContext,
  );

  return (
    <Card style={{ margin: '0px auto', maxWidth: 375 }}>
      <CardHeader
        avatar={
          user.photoURL ? (
            <Avatar
              alt={user.email}
              src={user.photoURL || ''}
              style={{ width: 50, height: 50 }}
            />
          ) : (
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          )
        }
        title={user.email}
      />
      <CardContent>
        <Typography variant="h5">Index Home page</Typography>
      </CardContent>
      <CardActions>
        {user.id ? (
          [
            <Button key="logout" onClick={() => handleLogout()}>
              Logout
            </Button>,
            <Button
              key="delete"
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteAccount()}
            >
              Delete Account
            </Button>,
          ]
        ) : (
          <Button onClick={() => handleLogin()}>Login</Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Index;
