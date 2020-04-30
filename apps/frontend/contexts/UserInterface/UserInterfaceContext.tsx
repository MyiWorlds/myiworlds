import AddIcon from '@material-ui/icons/Add';
import AppController from './AppController';
import AppDialog from './AppDialog/AppDialog';
import CircleSelector from '../../components/Circle/CircleSelector/CircleSelector';
import ContentArea from './ContentArea';
import DraggableDialog from './DraggableDialog';
import Fab from '@material-ui/core/Fab';
import Navigation from './Navigation';
import React, { useContext, useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import { Circle } from '@myiworlds/types';
import { ProviderStore } from './userInterfaceContextTypes';
import { UserContext } from './../User/UserContext';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';

export const UserInterfaceContext = React.createContext({} as ProviderStore);

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      width: '100%',
      height: '100%',
      background: theme.palette.background.default,
    },
    contentArea: {
      display: 'flex',
      maxHeight: '100%',
      overflow: 'auto',
      height: '100%',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
      zIndex: 1300,
    },
  }),
);

const UserInterfaceProvider: React.FC<Props> = React.memo(({ children }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const defaultNavWidth = 240;
  const [showNavigation, setShowNavigation] = useState(false);
  const [creatingCircle, setCreatingCircle] = useState(false);
  const [navWidth, setNavWidth] = useState(defaultNavWidth);
  const [isResizingNav, setIsResizingNav] = useState(false);
  const [contentViewing, setContentViewing] = useState<null | Circle>(null);
  const [navItems, setNavItems] = useState<React.ReactElement | null>(null);
  const [
    draggableDialogContent,
    setDraggableDialogContent,
  ] = useState<React.ReactElement | null>(null);
  const [appDialog, setAppDialog] = useState<React.ReactElement | null>(null);
  const [appBarItems, setAppBarItems] = useState<React.ReactElement | null>(
    null,
  );
  const theme = useTheme();

  const didMount = () => {
    if (window.innerWidth > theme.breakpoints.values.md) {
      setShowNavigation(true);
    }
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const updateNavWidth = () => {
    if (!navItems) {
      setNavWidth(defaultNavWidth);
    }
  };

  useEffect(updateNavWidth, [navItems]);
  useEffect(didMount, []);

  const createFab = user && user.canCreate && (
    <Zoom
      in={true}
      timeout={transitionDuration}
      style={{
        transitionDelay: `${transitionDuration.exit}ms`,
      }}
      unmountOnExit
    >
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setCreatingCircle(true)}
      >
        <AddIcon />
      </Fab>
    </Zoom>
  );

  return (
    <UserInterfaceContext.Provider
      value={{
        creatingCircle,
        setCreatingCircle,
        navWidth,
        setNavWidth,
        contentViewing,
        setContentViewing,
        setNavItems,
        setAppBarItems,
        setDraggableDialogContent,
        setAppDialog,
        isResizingNav,
        setIsResizingNav,
      }}
    >
      <div>
        {appDialog && <AppDialog appDialog={appDialog} />}
        {draggableDialogContent && (
          <DraggableDialog draggableDialogContent={draggableDialogContent} />
        )}
        {createFab}
        <CircleSelector />
        <div className={classes.root}>
          <AppController
            setShowNavigation={setShowNavigation}
            showNavigation={showNavigation}
            navWidth={navWidth}
            setNavWidth={setNavWidth}
            appBarItems={appBarItems}
          />
          <div className={classes.contentArea}>
            <Navigation
              showNavigation={showNavigation}
              setShowNavigation={setShowNavigation}
              navItems={navItems}
              isResizingNav={isResizingNav}
            />
            <ContentArea children={children} />
          </div>
        </div>
      </div>
    </UserInterfaceContext.Provider>
  );
});

const UserInterfaceConsumer = UserInterfaceContext.Consumer;

export { UserInterfaceProvider, UserInterfaceConsumer };
