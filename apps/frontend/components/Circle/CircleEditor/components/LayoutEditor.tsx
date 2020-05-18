import cloneDeep from 'lodash.clonedeep';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Circle } from '@myiworlds/types';
import { Layout } from 'react-grid-layout';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  generateLayoutFromSize,
  getCurrentLayoutSize,
} from '../../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';

interface Props {
  circleLayouts: Circle;
  setCircleLayouts: (circle: Circle) => void;
  fieldEditing: string;
  displaySize: null | number;
  setFieldEditing: (newFieldEditing: string | null) => void;
}

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    textAlign: 'center',
    margin: theme.spacing(2, 0),
  },
  width: {
    transform: 'rotate(90deg)',
  },
}));

export default function LayoutEditor({
  circleLayouts,
  setCircleLayouts,
  fieldEditing,
  displaySize,
  setFieldEditing,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const isSpacer = fieldEditing.startsWith('spacer-');

  const screenSize = displaySize
    ? getCurrentLayoutSize(displaySize, theme)
    : 'xl';

  const currentLayoutEditing = circleLayouts.data.layouts[screenSize].find(
    (layout: Layout) => layout.i === fieldEditing,
  );

  const isLayoutItemShown =
    currentLayoutEditing &&
    currentLayoutEditing.w !== 0 &&
    currentLayoutEditing.h !== 0;

  const addFieldToLayouts = () => {
    const previousLayouts = cloneDeep(circleLayouts.data.layouts);

    previousLayouts[screenSize] = previousLayouts[screenSize].map(
      (gridItem: any) => {
        if (gridItem.i === fieldEditing) {
          gridItem = {
            ...gridItem,
            ...generateLayoutFromSize(
              screenSize,
              fieldEditing,
              previousLayouts[screenSize].length,
            ),
          };
          if (gridItem.prevW) {
            gridItem.w = gridItem.prevW;
            gridItem.prevW = null;
          }
          if (gridItem.prevH) {
            gridItem.h = gridItem.prevH;
            gridItem.prevH = null;
          }
        }
        return gridItem;
      },
    );
    setCircleLayouts({
      ...circleLayouts,
      data: {
        layouts: previousLayouts,
      },
    });
  };

  const removeFieldToLayouts = () => {
    const updatedLayouts = cloneDeep(circleLayouts);

    if (isSpacer) {
      updatedLayouts.data.layouts[screenSize] = updatedLayouts.data.layouts[
        screenSize
      ].filter((gridItem: any) => gridItem.i !== fieldEditing);
    } else {
      updatedLayouts.data.layouts[screenSize] = updatedLayouts.data.layouts[
        screenSize
      ].map((gridItem: any) => {
        if (gridItem.i === fieldEditing) {
          gridItem.prevW = gridItem.w;
          gridItem.prevH = gridItem.h;
          gridItem.w = 0;
          gridItem.h = 0;
        }
        return gridItem;
      });
    }

    setCircleLayouts(updatedLayouts);
  };

  const editLayoutItem = (
    property: keyof Layout,
    value: string | number | boolean,
  ) => {
    const updatedLayouts = cloneDeep(circleLayouts);

    updatedLayouts.data.layouts[screenSize].forEach((layout: any) => {
      if (layout.i === fieldEditing) {
        layout[property] = value;
      }
    });
    setCircleLayouts(updatedLayouts);
  };

  const toggleStatic = () => {
    editLayoutItem('static', !currentLayoutEditing.static);
  };

  if (!currentLayoutEditing) {
    if (isSpacer) {
      setFieldEditing(null);
    }
    return null;
  }

  return (
    <div>
      {/* <div className={classes.toggleContainer}>
        <ToggleButtonGroup
          value={screenSize}
          exclusive
          onChange={handleScreenSize}
          aria-label="screen size"
        >
          <ToggleButton value="xs" aria-label="extra small">
            xs
          </ToggleButton>
          <ToggleButton value="sm" aria-label="small">
            sm
          </ToggleButton>
          <ToggleButton value="md" aria-label="medium">
            md
          </ToggleButton>
          <ToggleButton value="lg" aria-label="large">
            lg
          </ToggleButton>
          <ToggleButton value="xl" aria-label="extra large">
            xl
          </ToggleButton>
        </ToggleButtonGroup>
      </div> */}

      <ListItem>
        <ListItemIcon>
          {isLayoutItemShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Show" />

        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={
              isLayoutItemShown ? removeFieldToLayouts : addFieldToLayouts
            }
            checked={isLayoutItemShown}
            inputProps={{ 'aria-labelledby': 'switch-show-grid-item' }}
          />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          {currentLayoutEditing.static ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon>
        <ListItemText primary="Static" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={toggleStatic}
            checked={currentLayoutEditing.static}
            inputProps={{ 'aria-labelledby': 'switch-show-grid-item' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
