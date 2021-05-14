import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useContext } from 'react';
import Router from 'next/router';
import Spacer from './../../../components/Spacer/Spacer';
import { appDialogAtom } from '../../../atoms/userInterfaceAtoms';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';

const useStyles = makeStyles({
  root: {
    zIndex: 99999,
  },
  homeBtn: {
    margin: '0px auto',
    display: 'table',
  },
});

const RequestCreationModal: React.FunctionComponent = () => {
  const classes = useStyles();
  const setAppDialog = useSetRecoilState(appDialogAtom);

  const handleGoHome = () => {
    setAppDialog(null);
    Router.push(`/`, `/`);
  };

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
        You are not allowed to create yet
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          You must wait for a system administrator to accept your account
        </Typography>
        <Spacer />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          className={classes.homeBtn}
        >
          Home Page
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCreationModal;
