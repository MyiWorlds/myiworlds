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
        <button onClick={() => setValue(value + 1)}>increment</button>
        {user.id ? (
          <button onClick={() => handleLogout()}>Logout</button>
        ) : (
          <button onClick={() => handleLogin()}>Login</button>
        )}
      </div>
    </div>
  );
};

export default Index;
