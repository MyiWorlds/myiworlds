import Button from '@material-ui/core/Button';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/user/userContext';
import 'isomorphic-unfetch';

const Index = () => {
  const [value, setValue] = useState(0);
  const { user, handleLogout, handleLogin } = useContext(UserContext);

  return (
    <div>
      <div>
        App {user.email}
        <h3>{value}</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setValue(value + 1)}
        >
          increment
        </Button>
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
