import AppBar from '@material-ui/core/AppBar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CircleFieldEditor from './CircleFieldEditor';
import cloneDeep from 'lodash.clonedeep';
import IconButton from '@material-ui/core/IconButton';
import LayoutEditor from './LayoutEditor';
import List from '@material-ui/core/List';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { createCollectionIdClient } from './../../../../functions/createCollectionIdClient';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { Layout } from 'react-grid-layout';
import { useTheme } from '@material-ui/core/styles';
import {
  generateLayoutFromSize,
  getCurrentLayoutSize,
} from '../../../ReactGridLayout/Viewer/gridLayoutHelperFunctions';

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
  }),
);

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
  fieldEditing: null | string;
  setFieldEditing: (newFieldEditing: string | null) => void;
  circleLayouts: any;
  setCircleLayouts: (circle: Circle) => void;
  setCircleUi: (newValue: Circle) => void;
  displaySize: null | number;
  circleUis: null | Circle[];
}

export default function CircleFieldController({
  circle,
  updateCircle,
  fieldEditing,
  setFieldEditing,
  circleLayouts,
  setCircleLayouts,
  displaySize,
  circleUis,
  setCircleUi,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();

  if (!fieldEditing) {
    return null;
  }

  const isSpacer = fieldEditing.startsWith('spacer-');

  const screenSize = displaySize
    ? getCurrentLayoutSize(displaySize, theme)
    : 'xl';

  let currentLayoutEditing = circleLayouts.data.layouts[screenSize].find(
    (layout: Layout) => layout.i === fieldEditing,
  );

  let fieldUi = null;
  if (
    currentLayoutEditing &&
    currentLayoutEditing.ui &&
    circleUis &&
    circleUis.length
  ) {
    const savedFieldUi = circleUis.find(
      (ui: Circle) => ui.id === currentLayoutEditing.ui,
    );
    if (savedFieldUi) {
      fieldUi = savedFieldUi;
    }
  }

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
            gridItem.minW = 1;
          }
          if (gridItem.prevH) {
            gridItem.h = gridItem.prevH;
            gridItem.prevH = null;
            gridItem.minH = 1;
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

  const handleSetCircleUi = (newValue: Circle) => {
    if (newValue.id === '') {
      newValue.id = createCollectionIdClient(FIRESTORE_COLLECTIONS.CIRCLES);
    }
    setCircleUi(newValue);
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
          gridItem.minW = 0;
          gridItem.minH = 0;
        }
        return gridItem;
      });
    }

    setCircleLayouts(updatedLayouts);
  };

  const editLayoutItem = (
    property: keyof Layout | 'ui',
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
      return null;
    } else {
      currentLayoutEditing = generateLayoutFromSize(
        screenSize,
        fieldEditing,
        circleLayouts.data.layouts[screenSize].length,
      );
    }
  }

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
        {!isSpacer && (
          <CircleFieldEditor
            circle={circle}
            updateCircle={updateCircle}
            property={fieldEditing}
            value={circle[fieldEditing as keyof Circle]}
            fieldUi={fieldUi}
            setCircleUi={handleSetCircleUi}
          />
        )}
        <LayoutEditor
          isLayoutItemShown={isLayoutItemShown}
          removeFieldToLayouts={removeFieldToLayouts}
          addFieldToLayouts={addFieldToLayouts}
          toggleStatic={toggleStatic}
          currentLayoutEditing={currentLayoutEditing}
        />
      </List>
    </div>
  );
}
