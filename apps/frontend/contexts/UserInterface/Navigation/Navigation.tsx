import ButtonLink from '../../../components/ButtonLink/ButtonLink';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useContext } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UserContext } from './../../User/UserContext';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
interface Props {
  navWidth: number;
  showNavigation: boolean;
  setShowNavigation: (value: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

const Navigation: React.FC<Props> = ({
  navWidth,
  showNavigation,
  setShowNavigation,
}) => {
  const { user } = useContext(UserContext);
  const classes = useStyles({ navWidth });

  const navItems = (
    <List>
      <ListItem button component={ButtonLink} href="/" as="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={ButtonLink} href="/about" as="/about">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      {user && user.isSystemAdmin && (
        <ListItem button component={ButtonLink} href="/admin" as="/admin">
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <Hidden mdUp>
        <SwipeableDrawer
          variant="temporary"
          open={showNavigation}
          onOpen={() => {}}
          onClose={() => setShowNavigation(false)}
        >
          <div style={{ width: 250 }}>{navItems}</div>
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
          open={showNavigation}
        >
          <div className={classes.toolbar} />
          {navItems}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;
