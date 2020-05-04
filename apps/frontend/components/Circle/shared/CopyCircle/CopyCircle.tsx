import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { useContext, useEffect, useState } from 'react';
import { RESPONSE_CODES } from '@myiworlds/enums';
import { SystemMessagesContext } from '../../../../contexts/SystemMessages/SystemMessagesContext';
import { UserInterfaceContext } from '../../../../contexts/UserInterface/UserInterfaceContext';
import { useRouter } from 'next/router';
import {
  useCopyCircleMutation,
  CopyCircleMutation,
} from '../../../../generated/apolloComponents';
import {
  createStyles,
  makeStyles,
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
    root: {
      zIndex: 99999,
    },
  }),
);

interface Props {
  id: string;
  collection: 'circles' | 'circles-clones';
}

export default function CopyCircle({ id, collection }: Props) {
  const classes = useStyles();
  const { setAppDialog } = useContext(UserInterfaceContext);
  const { setAppSnackbar } = useContext(SystemMessagesContext);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [
    copyCircle,
    {
      data: copyCircleData,
      loading: copyCircleLoading,
      error: copyCircleError,
    },
  ] = useCopyCircleMutation({
    variables: {
      id,
      collection,
    },
  });
  const router = useRouter();

  const copyCircleDataChanged = () => {
    const copyCircleResponse: CopyCircleMutation | undefined = copyCircleData;

    if (copyCircleResponse && copyCircleResponse.copyCircle && copyCircleResponse?.copyCircle?.status === RESPONSE_CODES.SUCCESS && copyCircleResponse.copyCircle.copiedCircleId) {
      setAppDialog(null);
      router.push(`/id/[id]?=${copyCircleResponse.copyCircle.copiedCircleId}`, `/id/${copyCircleResponse.copyCircle.copiedCircleId}`);
    } else if (copyCircleResponse?.copyCircle?.status === RESPONSE_CODES.ERROR) {
      setAppSnackbar({
        title: copyCircleResponse?.copyCircle?.message ? copyCircleResponse?.copyCircle?.message : "There was an error copying the circle. Please try again",
        autoHideDuration: 2000,
      });
    }
  };

  const toggleNavigation = () => {
    if (showCopyDialog) {
      setAppDialog(
        <Dialog
          open={true}
          aria-labelledby="alert-appDialog-title"
          aria-describedby="alert-appDialog-description"
          classes={{
            root: classes.root,
          }}
          maxWidth={'sm'}
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">Copy</DialogTitle>
          <DialogContent>Copy and save to a circle in the system, or just copy and it will be in your history.</DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowCopyDialog(false)}
            >
              cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={true}
              >
              Copy and save to
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => copyCircle()}
            >
              copy and view
            </Button>
          </DialogActions>
        </Dialog>,
      );
    } else {
      setAppDialog(null);
    }
  };

  useEffect(toggleNavigation, [showCopyDialog]);
  useEffect(copyCircleDataChanged, [copyCircleData, copyCircleLoading,
    copyCircleError]);

  return (
    <Tooltip title="Copy">
      <span>
        <IconButton color="inherit" onClick={() => setShowCopyDialog(true)}>
          <FileCopyIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
}
