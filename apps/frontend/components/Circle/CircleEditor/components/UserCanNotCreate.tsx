import Button from '@material-ui/core/Button';
import ButtonLink from '../../../ButtonLink';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function UserCanNotCreate() {
  return (
    <div>
      <Typography variant="h1">You are currently not able to create</Typography>
      <Typography variant="h4">
        Please wait until this is ready for public use.
      </Typography>
      <Button component={ButtonLink} href="/">
        Home
      </Button>
    </div>
  );
}
