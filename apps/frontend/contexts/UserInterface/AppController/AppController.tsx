import AppBar from '@material-ui/core/AppBar';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShareIcon from '@material-ui/icons/Share';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/*
  This components primary purpose is to give the user a single place
  to control the content being display.  Its secondary purpose is to
  toggle the users navigation for them to do their primary tasks.
*/
interface Props {
  setShowNavigation: (value: boolean) => void;
  showNavigation: boolean;
  navWidth: number;
  setNavWidth: (value: number) => void;
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
  navWidth,
  setNavWidth,
}) => {
  const classes = useStyles();

  const handleToggleNavigation = () => {
    if (navWidth < 150 && showNavigation) {
      setShowNavigation(!showNavigation);
      setNavWidth(240);
    } else {
      setShowNavigation(!showNavigation);
    }
  };

  return (
    <AppBar position="static" className={classes.appBar}>
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
        <Typography variant="h6" className={classes.title}>
          MyiWorlds
        </Typography>

        <Tooltip title="Search">
          <span>
            <IconButton color="inherit" disabled={true}>
              <SearchIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Customize Layout">
          <span>
            <IconButton color="inherit" disabled={true}>
              <ViewQuiltIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Edit">
          <span>
            <IconButton color="inherit" disabled={true}>
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Copy">
          <span>
            <IconButton color="inherit" disabled={true}>
              <FileCopyIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Share">
          <span>
            <IconButton color="inherit" disabled={true}>
              <ShareIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="Fullscreen">
          <span>
            <IconButton color="inherit" disabled={true}>
              <FullscreenIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Tooltip title="More">
          <span>
            <IconButton color="inherit" disabled={true}>
              <MoreVertIcon />
            </IconButton>
          </span>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default AppController;
