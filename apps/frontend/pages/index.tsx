import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const Index = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Typography variant="h1">
        Index Home page <b>{count}</b>
      </Typography>
      <Button onClick={() => setCount(count + 1)}>Increase</Button>
    </div>
  );
};

export default Index;
