import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircleFieldEditor from './CircleFieldEditor';
import CodeIcon from '@material-ui/icons/Code';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import LayoutEditor from './LayoutEditor';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaletteIcon from '@material-ui/icons/Palette';
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    backButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
  fieldEditing: null | string;
  setFieldEditing: (newFieldEditing: string | null) => void;
  circleLayouts: any;
  setCircleLayouts: (circle: Circle) => void;
  editingGrid?: boolean;
  displaySize: null | number;
}

export default function CircleFieldController({
  circle,
  updateCircle,
  fieldEditing,
  setFieldEditing,
  circleLayouts,
  setCircleLayouts,
  editingGrid,
  displaySize,
}: Props) {
  const classes = useStyles();
  const [showValue, setShowValue] = useState(editingGrid ? false : true);
  const [showStyles, setShowStyles] = useState(false);

  const handleClickValue = () => {
    setShowValue(!showValue);
  };

  const handleClickStyles = () => {
    setShowStyles(!showStyles);
  };

  if (!fieldEditing) {
    return null;
  }

  const isSpacer = fieldEditing.startsWith('spacer-');

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.backButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setFieldEditing(null)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {isSpacer ? 'Spacer' : fieldEditing}
          </Typography>
        </Toolbar>
      </AppBar>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <LayoutEditor
          circleLayouts={circleLayouts}
          setCircleLayouts={setCircleLayouts}
          fieldEditing={fieldEditing}
          displaySize={displaySize}
          setFieldEditing={setFieldEditing}
        />

        {!isSpacer && (
          <>
            <ListItem button onClick={handleClickValue}>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary="Value" />
              {showValue ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showValue} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <CircleFieldEditor
                  circle={circle}
                  updateCircle={updateCircle}
                  property={fieldEditing}
                  value={circle[fieldEditing as keyof Circle]}
                />
              </List>
            </Collapse>

            <ListItem button onClick={handleClickStyles}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText primary="Styles" />
              {showStyles ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={showStyles} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  {/* <ListItemIcon>
              <StarBorder />
            </ListItemIcon> */}
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}
      </List>
    </div>
  );
}
