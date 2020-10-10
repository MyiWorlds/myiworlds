import AddIcon from '@material-ui/icons/Add';
import AppController from './AppController';
import AppDialog from './AppDialog/AppDialog';
import CircleSelector from '../../components/Circle/CircleSelector/CircleSelector';
import ContentArea from './ContentArea';
import DraggableDialog from './DraggableDialog';
import Fab from '@material-ui/core/Fab';
import Navigation from './Navigation';
import Zoom from '@material-ui/core/Zoom';
import { Circle } from '@myiworlds/types';
import { CircleHydrated } from '../../../../libs/types/src/circle';
import { convertAllNestedHydratedCircleToFlatCircle } from '../../components/Circle/functions/convertHydratedCircleToFlatCircle';
import { ProviderStore } from './userInterfaceContextTypes';
import { UserContext } from './../User/UserContext';
import { useRouter } from 'next/router';
import React, {
  useContext,
  useEffect,
  // useReducer,
  useState,
} from 'react';
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

// function reducer(state: State, action: UpdateCircleFieldAction): State {
//   if (!action.type) return state;
//   switch (action.type) {
//     // Resume
//     case 'RESIZE-NAV':
//       return {
//         ...state,
//       };
//     case 'UPDATE-UI':
//     // Local state change
//     case 'SAVE-UI':
//       // Save UI to users profile
//       // Saves to a my components list
//       return {
//         ...state,
//       };
//     default: {
//       console.error('Reducer got unusable command');
//       return state;
//     }
//   }
// }

// DEFAULT UI should come from local storage first.
// Prompt user resume from this if different from what is given to it
// Show loading bars on UI?
const defaultUI: CircleHydrated = {
  id: 'user-interface',
  title: 'User Interface',
  // state: {
  //   showController: true,
  //   controllerWidth: 244,
  // },
  layouts: {
    id: 'ui-layout',
  },
  lines: [
    {
      id: 'app-bar',
      type: 'LINES',
      // state: {},
      layouts: {
        id: 'app-bar-layouts',
        // type: 'REACT-GRID-LAYOUT'  // Allow for other types
      },
      lines: [
        {
          id: 'app-bar-layouts',
          title: 'TEST',
          // type: 'REACT-GRID-LAYOUT'  // Allow for other types
        },
        {
          id: 'controller-toggle-button',
          // type: 'BUTTON',
          // state: {},
        },
        {
          id: 'domain-name',
          type: 'STRING',
          string: 'MyiWorlds',
        },
        {
          id: 'search-field',
          // type: 'SEARCH',
        },
      ],
      // component: null,
    },
    {
      id: 'controller',
      type: 'LINES',
      // component: 'MENU'
      lines: [
        {
          id: 'home',
        },
      ],
    },
    {
      id: 'content',
      // component: null,
    },
  ],
};

const UserInterfaceProvider: React.FC<Props> = React.memo(({ children }) => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const classes = useStyles();
  // Maybe put this in lib so it can be used by both front/admin backend
  // const [{ ui }, dispatch] = React.useReducer(reducer, defaultUI);
  // const [ui, setUI] = useState(defaultUI);
  const defaultNavWidth = 240;
  const [showNavigation, setShowNavigation] = useState(false);
  const [creatingCircle, setCreatingCircle] = useState(false);
  const [navWidth, setNavWidth] = useState(defaultNavWidth);
  const [isResizingNav, setIsResizingNav] = useState(false);
  const [contentViewing, setContentViewing] = useState<null | Circle>(null);
  const [navItems, setController] = useState<React.ReactElement | null>(null);
  const [
    draggableDialogContent,
    setDraggableDialogContent,
  ] = useState<React.ReactElement | null>(null);
  const [appDialog, setAppDialog] = useState<React.ReactElement | null>(null);
  const [appBarItems, setAppBarItems] = useState<React.ReactElement | null>(
    null,
  );
  const theme = useTheme();
  console.log(
    'defaultUI',
    '\n',
    convertAllNestedHydratedCircleToFlatCircle(defaultUI),
  );
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

  const createFab = user && user.canCreate && router.pathname !== '/edit/[id]' && (
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
        setController,
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
