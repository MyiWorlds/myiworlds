import React, { useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { UserContext } from '../contexts/user/UserContext';

const Index = () => {
  const [count, setCount] = useState(0);
  const { user, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div>
      <Typography variant="h5">
        Index Home page <b>{count}</b>
      </Typography>
      <Typography variant="h3">{user.email}</Typography>
      {user.id ? (
        <Button onClick={() => handleLogout()}>Logout</Button>
      ) : (
        <Button onClick={() => handleLogin()}>Login</Button>
      )}
      <Button onClick={() => setCount(count + 1)}>Increase</Button>
    </div>
  );
};

export default Index;
