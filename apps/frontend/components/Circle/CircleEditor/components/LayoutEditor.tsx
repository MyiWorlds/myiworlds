import cloneDeep from 'lodash.clonedeep';
import HeightIcon from '@material-ui/icons/Height';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import LayersIcon from '@material-ui/icons/Layers';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Circle } from '@myiworlds/types';
import { generateLayoutFromSize } from '../../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';
import { Layout } from 'react-grid-layout';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  circleLayouts: Circle;
  setCircleLayouts: (circle: Circle) => void;
  fieldEditing: string;
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
}: Props) {
  const classes = useStyles();
  const [screenSize, setScreenSize] = useState('xl');

  const handleScreenSize = (
    event: React.MouseEvent<HTMLElement>,
    newScreenSize: string | null,
  ) => {
    if (newScreenSize) {
      setScreenSize(newScreenSize);
    }
  };

  const currentLayoutEditing = circleLayouts.data.layouts[screenSize].find(
    (layout: Layout) => layout.i === fieldEditing,
  );

  const isLayoutItemShown =
    currentLayoutEditing &&
    currentLayoutEditing.w !== 0 &&
    currentLayoutEditing.h !== 0;

  const addFieldToLayouts = () => {
    const screenSizes = Object.keys(circleLayouts.data.layouts);

    const previousLayouts = cloneDeep(circleLayouts.data.layouts);

    screenSizes.forEach((size: any) => {
      previousLayouts[size] = previousLayouts[size].map((gridItem: any) => {
        if (gridItem.i === fieldEditing) {
          gridItem = generateLayoutFromSize(
            size,
            fieldEditing,
            previousLayouts[size].length,
          );
        }
        return gridItem;
      });
    });
    setCircleLayouts({
      ...circleLayouts,
      data: {
        layouts: previousLayouts,
      },
    });
  };

  const removeFieldToLayouts = () => {
    const updatedLayouts = cloneDeep(circleLayouts);
    const screenSizes = Object.keys(circleLayouts.data.layouts);

    screenSizes.forEach((size: any) => {
      updatedLayouts.data.layouts[size] = updatedLayouts.data.layouts[size].map(
        (gridItem: any) => {
          if (gridItem.i === fieldEditing) {
            gridItem.w = 0;
            gridItem.h = 0;
          }
          return gridItem;
        },
      );
    });

    // const updatedLayouts = {
    //   ...circleLayouts,
    //   data: {
    //     layouts: )
    //   }
    // }

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
    return <div>Add grid item back</div>;
  }

  return (
    <div>
      <div className={classes.toggleContainer}>
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
      </div>

      <ListItem>
        <ListItemIcon>
          {isLayoutItemShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-wifi"
          primary={
            <>
              Show{' '}
              <Tooltip title="This will hide it on all screen sizes">
                <IconButton aria-label="help">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </>
          }
        />

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
          <LayersIcon />
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

      <ListItem>
        <ListItemIcon>
          <HeightIcon />
        </ListItemIcon>
        <ListItemText primary="Height" />
        {currentLayoutEditing.h}
      </ListItem>

      <ListItem>
        <ListItemIcon>
          <HeightIcon className={classes.width} />
        </ListItemIcon>
        <ListItemText primary="Width" />
        {currentLayoutEditing.w}
      </ListItem>
    </div>
  );
}
