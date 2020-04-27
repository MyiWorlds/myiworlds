import React from 'react';
import Spacer from './../../Spacer/Spacer';
import TextField from '@material-ui/core/TextField';

export default function TextFields() {
  return (
    <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Standard" />
      <Spacer />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <Spacer />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </form>
  );
}
