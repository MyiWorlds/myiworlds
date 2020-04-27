import React from 'react';
import Spacer from '../../Spacer/Spacer';
import { Button, CardActions, Typography } from '@material-ui/core';

export default function Buttons() {
  return (
    <div>
      <Typography variant="h6">Primary Buttons:</Typography>
      <CardActions>
        <Button variant="contained" color="primary">
          contained
        </Button>
        <Button color="primary">Flat</Button>
        <Button variant="outlined" color="primary">
          outlined
        </Button>
      </CardActions>

      <Spacer />

      <Typography variant="h6">Secondary Buttons:</Typography>
      <CardActions>
        <Button variant="contained" color="secondary">
          contained
        </Button>
        <Button color="secondary">Flat</Button>
        <Button variant="outlined" color="secondary">
          outlined
        </Button>
      </CardActions>

      <Spacer />

      <Typography variant="h6">Default Buttons:</Typography>
      <CardActions>
        <Button variant="contained" color="default">
          contained
        </Button>
        <Button color="default">Flat</Button>
        <Button variant="outlined" color="default">
          outlined
        </Button>
      </CardActions>
    </div>
  );
}
