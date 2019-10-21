import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { ProfileContext } from '../context/profile/ProfileContext';
import { Typography } from '@material-ui/core';
import { UserContext } from '../context/user/UserContext';
import 'isomorphic-unfetch';

// const uiCircle = [
//   {
//     type: 'APPBAR-Controller',
//     lines: [
//       {
//         type: 'icon-btn-menu',
//       },
//       {
//         type: 'img-btn',
//         // open modal or dropdown for user options
//       },
//     ],
//   },
//   {
//     type: 'APP-NAVIGATOR',
//     lines: [
//       {
//         type: 'icon-btn-menu',
//         title: 'home',
//       },
//       //  ...
//     ],
//   },
// ];

const Index = () => {
  const { user, handleLogout, handleLogin } = useContext(UserContext);
  const { selectedProfile } = useContext(ProfileContext);

  return (
    <div>
      <div>
        <Typography variant="caption">User:</Typography>
        <Typography variant="h4">{user.email}</Typography>
        <br />
        <Typography variant="h3">{selectedProfile.username}</Typography>
        {user.id ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        )}

        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
        <h1>as;ldkfjalskdjf</h1>
      </div>
    </div>
  );
};

export default Index;
