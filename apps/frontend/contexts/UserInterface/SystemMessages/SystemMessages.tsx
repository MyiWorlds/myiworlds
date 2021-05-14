import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, {
  MouseEvent,
  SyntheticEvent,
  useEffect,
  useState
  } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { systemMessagesAtom } from '../../../atoms/userInterfaceAtoms';
import { SystemMessageTypes } from './systemMessagesTypes';
import { useRecoilState } from 'recoil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  }),
);

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SystemMessages = () => {
  const classes = useStyles();
  const [systemMessages, setSystemMessages] = useRecoilState(
    systemMessagesAtom,
  );
  const [open, setOpen] = useState(false);

  const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSystemMessages(null);
    setOpen(false);
  };

  useEffect(() => {
    if (systemMessages && !open) {
      setOpen(true);
    }
  }, [systemMessages, open]);

  const snackbar: SystemMessageTypes = {
    title: '',
    autoHideDuration: 3000,
    showClose: true,
    ...systemMessages,
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={snackbar.autoHideDuration}
      onClose={handleClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={
        snackbar.severity ? null : <span id="message-id">{snackbar.title}</span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    >
      {snackbar.severity ? (
        <Alert severity={snackbar.severity} variant="filled">
          <span id="message-id">{snackbar.title}</span>
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default SystemMessages;
