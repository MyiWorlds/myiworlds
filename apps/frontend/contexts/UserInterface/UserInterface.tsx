import AppController from './AppController';
import ContentArea from './ContentArea';
import Navigation from './Navigation';
import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';

interface Props {
  children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    contentArea: {
      display: 'flex',
      maxHeight: '100%',
      overflow: 'auto',
    },
  }),
);

const UserInterface: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [showNavigation, setShowNavigation] = useState(false);
  const theme = useTheme();
  const didMount = () => {
    if (window.innerWidth > theme.breakpoints.values.sm) {
      setShowNavigation(true);
    }
  };

  useEffect(didMount, []);

  const navWidth = 240;

  return (
    <div className={classes.root}>
      <AppController
        setShowNavigation={setShowNavigation}
        showNavigation={showNavigation}
      />
      <div className={classes.contentArea}>
        <Navigation
          navWidth={navWidth}
          showNavigation={showNavigation}
          setShowNavigation={setShowNavigation}
        />
        <ContentArea children={children} />
      </div>
    </div>
  );
};

export default UserInterface;
