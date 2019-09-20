import Button from '@material-ui/core/Button';
import React, { useContext } from 'react';
import { UserContext } from '../context/user/userContext';
import 'isomorphic-unfetch';

const Index = () => {
  const { user, handleLogout, handleLogin } = useContext(UserContext);

  return (
    <div>
      <div>
        {user.email}
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
      </div>
    </div>
  );
};

export default Index;
