import AddIcon from '@material-ui/icons/Add';
import AppController from './AppController';
import ContentArea from './ContentArea';
import Fab from '@material-ui/core/Fab';
import Navigation from './Navigation';
import React, { useContext, useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import { CreateCircleProvider } from '../Circle/CreateCircleContext';
import { ProfileProvider } from '../Profile/ProfileContext';
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
      right: theme.spacing(2),
      zIndex: 1300,
    },
  }),
);

const UserInterfaceProvider: React.FC<Props> = ({ children }) => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [showNavigation, setShowNavigation] = useState(false);
  const [creatingCircle, setCreatingCircle] = useState(false);
  const [navWidth, setNavWidth] = useState(240);
  const theme = useTheme();

  const didMount = () => {
    if (window.innerWidth > theme.breakpoints.values.sm) {
      setShowNavigation(true);
    }
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  useEffect(didMount, []);

  return (
    <UserInterfaceContext.Provider
      value={{
        creatingCircle,
        setCreatingCircle,
        navWidth,
        setNavWidth,
      }}
    >
      {user && user.canCreate && (
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
      )}

      <ProfileProvider>
        <div>
          <CreateCircleProvider />
          <div className={classes.root}>
            <AppController
              setShowNavigation={setShowNavigation}
              showNavigation={showNavigation}
              navWidth={navWidth}
              setNavWidth={setNavWidth}
            />
            <div className={classes.contentArea}>
              <Navigation
                showNavigation={showNavigation}
                setShowNavigation={setShowNavigation}
              />
              <ContentArea children={children} />
            </div>
          </div>
        </div>
      </ProfileProvider>
    </UserInterfaceContext.Provider>
  );
};

const UserInterfaceConsumer = UserInterfaceContext.Consumer;

export { UserInterfaceProvider, UserInterfaceConsumer };
