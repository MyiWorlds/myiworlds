import ButtonLink from '../../ButtonLink';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import { canEdit } from '@myiworlds/helper-functions';
import { Circle } from '@myiworlds/types';
import { ProfileContext } from './../../../contexts/Profile/ProfileContext';
import { SystemMessagesContext } from './../../../contexts/SystemMessages/SystemMessagesContext';
import { UserContext } from '../../../contexts/User/UserContext';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginLeft: theme.spacing(2),
      flexGrow: 1,
    },
  }),
);

interface Props {
  circle: Circle;
}

export default function CircleViewerAppBarItems({ circle }: Props) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { selectedProfile } = useContext(ProfileContext);
  const { setAppSnackbar } = useContext(SystemMessagesContext);

  let editButton = null;

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setAppSnackbar({
      title: 'Copied!',
      autoHideDuration: 2000,
    });
  };

  if (canEdit(circle, selectedProfile.id) || user.isSystemAdmin) {
    editButton = (
      <Tooltip title="Edit">
        <span>
          <IconButton
            color="inherit"
            component={ButtonLink}
            href={`/edit/[id]?id=${circle.id}`}
            as={`/edit/${circle.id}`}
          >
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        {circle.title || 'Untitled'}
      </Typography>
      <Tooltip title="Share">
        <span>
          <IconButton color="inherit" onClick={copyUrl}>
            <ShareIcon />
          </IconButton>
        </span>
      </Tooltip>
      {editButton}
    </>
  );
}
