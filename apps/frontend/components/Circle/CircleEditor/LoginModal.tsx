import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from './../../../contexts/User/UserContext';
interface Props {}

const useStyles = makeStyles({
  root: {
    zIndex: 99999,
  },
  loginBtn: {
    margin: '0px auto',
    display: 'flex',
  },
});

const LoginModal: React.FunctionComponent<Props> = () => {
  const classes = useStyles();
  const { handleLogin } = useContext(UserContext);

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-appDialog-title"
      aria-describedby="alert-appDialog-description"
      classes={{
        root: classes.root,
      }}
      maxWidth={'md'}
    >
      <DialogTitle id="alert-dialog-title">
        You must login or create an account before you can edit
      </DialogTitle>
      <DialogContent>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin()}
          className={classes.loginBtn}
        >
          Login or Create Account
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
