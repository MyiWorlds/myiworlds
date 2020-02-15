import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  open: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
}

const DeleteAccountModal: React.FunctionComponent<Props> = ({
  open,
  handleCancel,
  handleDelete,
}) => {
  const [textField, setTextField] = useState('');

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Account</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Deleting your account is permanent. If you wish to proceed type{' '}
          <b>"DELETE"</b> in the textfield below
          <br />
          <br />
          <br />
          <br />
          <TextField
            id="delete-textfield"
            variant="outlined"
            label='Type "DELETE" here'
            fullWidth
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTextField(e.target.value)
            }
            autoComplete="off"
          />
          <br />
          <br />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="secondary"
          autoFocus
          disabled={textField !== 'DELETE'}
        >
          Delete Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAccountModal;
