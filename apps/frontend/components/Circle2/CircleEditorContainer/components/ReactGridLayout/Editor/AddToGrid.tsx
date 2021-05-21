import AddIcon from '@material-ui/icons/Add';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import cloneDeep from 'lodash.clonedeep';
import Fab from '@material-ui/core/Fab';
import Grow from '@material-ui/core/Grow';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import React from 'react';
import ViewDayIcon from '@material-ui/icons/ViewDay';
import Zoom from '@material-ui/core/Zoom';
import { Circle } from '@myiworlds/types';
import {
  generateSpacerLayoutFromSize,
  getCurrentLayoutSize,
} from './../Viewer/gridLayoutHelperFunctions';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';

interface Props {
  circle: Circle;
  circleLayouts: Circle;
  displaySize: number;
  setCircleLayouts: (newValues: Circle) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {},
    root: {
      display: 'flex',
      zIndex: 1300,
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    paperMenu: {
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(2),
    },
  }),
);

const AddToGrid: React.FC<Props> = ({
  circle,
  circleLayouts,
  displaySize,
  setCircleLayouts,
}) => {
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const addSpacer = () => {
    const currentSize = getCurrentLayoutSize(displaySize, theme);
    const newSpacerItem = generateSpacerLayoutFromSize(
      currentSize,
      circleLayouts.data.layouts[currentSize].length,
    );
    const updatedLayouts = cloneDeep(circleLayouts);

    updatedLayouts.data.layouts[currentSize].push(newSpacerItem);

    setCircleLayouts(updatedLayouts);
    setOpen(false);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <div className={classes.root}>
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
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AddIcon />
        </Fab>
      </Zoom>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps }: any) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'top right',
            }}
          >
            <Paper className={classes.paperMenu}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={addSpacer} button>
                    <ListItemIcon>
                      <ViewDayIcon fontSize="small" />
                    </ListItemIcon>
                    Spacer
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AddToGrid;
