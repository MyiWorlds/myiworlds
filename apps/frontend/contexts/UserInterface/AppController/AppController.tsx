import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { appControllerItemsAtom } from '../../../atoms/userInterfaceAtoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

/*
  This components primary purpose is to give the user a single place
  to control the content being display.  Its secondary purpose is to
  toggle the users navigation for them to do their primary tasks.
*/
interface Props {
  setShowNavigation: (value: boolean) => void;
  showNavigation: boolean;
  contentControllerWidth: number;
  setContentControllerWidth: (value: number) => void;
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
  }),
);

const AppController: React.FC<Props> = ({
  setShowNavigation,
  showNavigation,
  contentControllerWidth,
  setContentControllerWidth,
}) => {
  const classes = useStyles();
  const appControllerItems = useRecoilValue(appControllerItemsAtom);

  const handleToggleNavigation = () => {
    if (contentControllerWidth < 150 && showNavigation) {
      setShowNavigation(!showNavigation);
      setContentControllerWidth(240);
    } else {
      setShowNavigation(!showNavigation);
    }
  };

  const defaultAppBarItems = [
    <Typography key="title" variant="h6" className={classes.title}>
      MyiWorlds
    </Typography>,
    <Tooltip title="Search" key="search">
      <span>
        <IconButton color="inherit" disabled={true}>
          <SearchIcon />
        </IconButton>
      </span>
    </Tooltip>,
  ];

  const displayedAppBarItems = appControllerItems
    ? appControllerItems
    : defaultAppBarItems;

  return (
    <AppBar position="static" color="default" className={classes.appBar}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleToggleNavigation}
        >
          <MenuIcon />
        </IconButton>
        {displayedAppBarItems}
      </Toolbar>
    </AppBar>
  );
};

export default AppController;
