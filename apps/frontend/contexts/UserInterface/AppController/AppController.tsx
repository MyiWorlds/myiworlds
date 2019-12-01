import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonLink from '../../../components/ButtonLink/ButtonLink';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UserContext } from './../../User/UserContext';

interface Props {
  setShowNavigation: (value: boolean) => void;
  showNavigation: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      height: 50,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    userIcon: {
      cursor: 'pointer',
      '&:hover': {
        boxShadow: theme.shadows[4],
      },
    },
  }),
);

const AppController: React.FC<Props> = ({
  setShowNavigation,
  showNavigation,
}) => {
  const classes = useStyles();
  const { user, handleLogin } = useContext(UserContext);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => setShowNavigation(!showNavigation)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          MyiWorlds
        </Typography>
        {user.id ? (
          <Avatar
            className={classes.userIcon}
            alt={user.email}
            component={ButtonLink}
            href="/user/[id]"
            as={`/user/${user.id}`}
            src={user.photoURL || ''}
          />
        ) : (
          <Button color="inherit" onClick={() => handleLogin()}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppController;
