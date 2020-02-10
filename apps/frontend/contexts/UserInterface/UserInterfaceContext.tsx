import AppController from './AppController';
import ContentArea from './ContentArea';
import Navigation from './Navigation';
import React, { useEffect, useState } from 'react';
import { CreateCircleProvider } from '../Circle/CreateCircleContext';
import { ProviderStore } from './userInterfaceContextTypes';
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
  }),
);

const UserInterfaceProvider: React.FC<Props> = ({ children }) => {
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
    </UserInterfaceContext.Provider>
  );
};

const UserInterfaceConsumer = UserInterfaceContext.Consumer;

export { UserInterfaceProvider, UserInterfaceConsumer };
