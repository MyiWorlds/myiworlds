import AppBar from '@material-ui/core/AppBar';
import DialogContent from '@material-ui/core/DialogContent';
import Draggable from 'react-draggable';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, IconButton, makeStyles } from '@material-ui/core';

interface Props {
  draggableDialogContent: React.ReactElement;
}

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: { minHeight: 50 },
    modal: {
      width: (props: any) => props.modalWidth,
      height: 'auto',
      maxHeight: 800,
      overflowY: 'auto',
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      cursor: 'move',
    },
    paper: {
      // height: '100%',
      width: '100%',
      overflowY: 'auto',
    },
  }),
);

const DraggableDialog: React.FC<Props> = React.memo(
  ({ draggableDialogContent }) => {
    const modalWidth = 400;
    const classes = useStyles({ modalWidth });

    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
        positionOffset={{ x: window.innerWidth - modalWidth - 12, y: 62 }}
      >
        <Modal
          open={true}
          className={classes.modal}
          // onClose={handleClose}
          hideBackdrop={true}
          disableBackdropClick={true}
          aria-labelledby="draggable-dialog-title"
          disableScrollLock={true}
        >
          <Paper elevation={10} className={classes.paper}>
            <AppBar
              id="draggable-dialog-title"
              className={classes.appBar}
              position="fixed"
              color="default"
            >
              <Toolbar variant="dense">
                <Typography key="title" variant="h6" className={classes.title}>
                  Editor
                </Typography>
                <IconButton className={classes.appBar}>
                  <DragHandleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <div className={classes.toolbar} />

            <DialogContent>
              <div>{draggableDialogContent}</div>
            </DialogContent>
          </Paper>
        </Modal>
      </Draggable>
    );
  },
);

export default DraggableDialog;
