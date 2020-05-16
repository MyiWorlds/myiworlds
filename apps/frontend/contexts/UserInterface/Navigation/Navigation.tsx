import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import ButtonLink from '../../../components/ButtonLink/ButtonLink';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Media from './../../../components/Media/Media';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ProfileContext } from './../../Profile/ProfileContext';
import { UserContext } from '../../User/UserContext';
import { UserInterfaceContext } from '../UserInterfaceContext';
import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';

interface Props {
  showNavigation: boolean;
  setShowNavigation: (value: boolean) => void;
  navItems: null | React.ReactElement;
  isResizingNav: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileDrawer: {
      width: 250,
      height: '100%',
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: (props: any) => props.navWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      [theme.breakpoints.up('md')]: {
        width: theme.spacing(7) + 1,
      },
    },
    toolbar: {
      minHeight: 50,
    },
    list: {
      height: '100%',
      overflow: 'hidden',
    },
    userBtn: {
      position: 'absolute',
      bottom: 0,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    dragger: {
      width: theme.spacing(),
      cursor: 'ew-resize',
      padding: '4px 0 0',
      borderTop: '1px solid #ddd',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    drawerPaper: {
      height: '100%',
      overflow: 'auto',
    },
  }),
);

// If needed around the application in the future we should put this in its own react hook component to reuse
// It auto attaches/removes the listeners
function useEventListener(eventName: any, handler: any, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef<any>();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    // Make sure element supports addEventListener
    // On
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: any) => {
      savedHandler.current(event);
    };

    // Add event listener
    element.addEventListener(eventName, eventListener);

    // Remove event listener on cleanup
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]); // Re-run if eventName or element changes
}

const Navigation: React.FC<Props> = ({
  showNavigation,
  setShowNavigation,
  navItems,
}) => {
  const { user, handleLogin } = useContext(UserContext);
  const { selectedProfile } = useContext(ProfileContext);
  const {
    creatingCircle,
    navWidth,
    setNavWidth,
    setIsResizingNav,
    isResizingNav,
  } = useContext(UserInterfaceContext);
  const classes = useStyles({ navWidth });
  const [open, setOpen] = useState(false);

  const handleShowMoreMenuItems = () => {
    if (!showNavigation) {
      setShowNavigation(true);
    }
    setOpen(!open);
  };

  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handleMouseMove = (e: MouseEvent) => {
    // we don't want to do anything if we aren't resizing.
    if (!isResizingNav) {
      return;
    }
    const offsetLeft = e.clientX - 20;
    const minWidth = 57;
    const maxWidth = 1000;

    if (offsetLeft > minWidth && offsetLeft < maxWidth) {
      setNavWidth(offsetLeft);
    }
  };

  const handleMouseup = (e: MouseEvent) => {
    setIsResizingNav(false);
  };

  const handleMousedown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!showNavigation) {
      setShowNavigation(true);
    }
    setIsResizingNav(true);
  };

  const defaultController = (
    <List className={classes.list}>
      <ListItem button component={ButtonLink} href="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button disabled={true}>
        <ListItemIcon>
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button disabled={true}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItem>
      <ListItem button disabled={true}>
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="Explore" />
      </ListItem>
      <ListItem button disabled={true}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="History" />
      </ListItem>
      <ListItem button disabled={true}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>

      {user && user.isSystemAdmin && (
        <ListItem button component={ButtonLink} href="/admin" as="/admin">
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      )}

      <ListItem button onClick={handleShowMoreMenuItems}>
        <ListItemIcon>
          <MoreVertIcon />
        </ListItemIcon>
        <ListItemText primary="More" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem
          button
          component={ButtonLink}
          href="/about"
          as="/about"
          className={classes.nested}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </Collapse>

      {selectedProfile.id !== 'guest' ? (
        <ListItem
          className={classes.userBtn}
          button
          component={ButtonLink}
          href="/user"
        >
          <ListItemIcon>
            <Avatar>
              <Media circle={selectedProfile.media} />
            </Avatar>
          </ListItemIcon>
          <ListItemText secondary={selectedProfile.username} />
        </ListItem>
      ) : (
        <ListItem
          className={classes.userBtn}
          button
          onClick={() => handleLogin()}
        >
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      )}
    </List>
  );

  const displayedController = navItems ? navItems : defaultController;

  useCallback(handleMouseMove, [setNavWidth]);
  useEventListener('mousemove', handleMouseMove);
  useEventListener('mouseup', handleMouseup);

  return (
    <>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          open={showNavigation && !creatingCircle}
          onOpen={() => {}}
          onClose={() => setShowNavigation(false)}
        >
          <div className={classes.mobileDrawer}>{displayedController}</div>
        </SwipeableDrawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: showNavigation,
            [classes.drawerClose]: !showNavigation,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: showNavigation,
              [classes.drawerClose]: !showNavigation,
            }),
          }}
          open={showNavigation && !creatingCircle}
        >
          <div
            id="dragger"
            onMouseDown={handleMousedown}
            className={classes.dragger}
          />
          <div className={classes.toolbar} />
          <div className={classes.drawerPaper}>{displayedController}</div>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
