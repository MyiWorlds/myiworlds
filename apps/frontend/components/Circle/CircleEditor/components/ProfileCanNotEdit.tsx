import Button from '@material-ui/core/Button';
import ButtonLink from '../../../ButtonLink';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ProfileCanNotEdit() {
  return (
    <div>
      <Typography variant="h1">You are not able to edit this circle</Typography>
      <Typography variant="h4">Request edit or view</Typography>
      <Button component={ButtonLink} href="/">
        Home
      </Button>
    </div>
  );
}
