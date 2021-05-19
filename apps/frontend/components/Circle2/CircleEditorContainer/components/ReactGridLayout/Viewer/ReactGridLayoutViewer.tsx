import AddToGrid from './../Editor/AddToGrid';
import CircleFieldViewer from './../../Circle/CircleViewer/CircleFieldViewer';
import CircleFieldViewerContainer from './../../Circle/CircleViewer/CircleFieldViewerContainer';
import React, { useContext, useEffect, useState } from 'react';
import { Circle } from '@myiworlds/types';
import { getCurrentLayoutSize } from './gridLayoutHelperFunctions';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import {
  Layout,
  Responsive,
  // ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  circle: Circle;
  circleLayouts: Circle;
  displaySize?: null | number;
  editingGrid?: boolean;
  setCircleLayouts?: (newValues: Circle) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(24),
    },
    spacerText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

const ReactGridLayoutViewer: React.FC<Props> = ({
  circle,
  circleLayouts,
  displaySize,
  editingGrid,
  setCircleLayouts,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const { contentControllerWidth, isResizingContentController } = useContext(
    UserInterfaceContext,
  );
  const [classNames, setClassNames] = useState(
    'flex layout bg-white shadow rounded-sm',
  );
  const [showGrid, setShowGrid] = useState(false);

  const preventInitialAnimation = () => {
    const timer = setTimeout(
      () => setClassNames('layout animated'),
      theme.transitions.duration.enteringScreen + 800,
    );
    return () => clearTimeout(timer);
  };

  const handleLayoutChange = (
    currentLayout: Layout[],
    allLayouts: ReactGridLayout.Layouts,
  ) => {
    if (setCircleLayouts && editingGrid) {
      setCircleLayouts({
        ...circleLayouts,
        data: {
          layouts: allLayouts,
        },
      });
    }
  };

  useEffect(preventInitialAnimation, [
    theme.transitions.duration.enteringScreen,
  ]);

  useEffect(() => {
    if (!isResizingContentController) {
      const timer = setTimeout(() => {
        if (!showGrid) {
          setShowGrid(true);
        }
        console.log('React grid layout resize event');
        window.dispatchEvent(new Event('resize'));
      }, theme.transitions.duration.enteringScreen + 700);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isResizingContentController,
    contentControllerWidth,
    classNames,
    displaySize,
  ]);

  if (!showGrid) {
    return null;
  }

  const newGrid: any = [];

  for (const [key, value] of Object.entries(circle)) {
    const itemInGrid = circleLayouts.data.layouts[
      getCurrentLayoutSize(displaySize, theme)
    ].find((gridItem: any) => {
      return gridItem.i === key && gridItem.w !== 0 && gridItem.h !== 0;
    });
    if (itemInGrid) {
      newGrid.push(
        <div key={key}>
          <CircleFieldViewer
            property={key}
            value={value}
            circle={circle}
            editingGrid={editingGrid}
          />
        </div>,
      );
    }
  }

  circleLayouts.data.layouts[getCurrentLayoutSize(displaySize, theme)].forEach(
    (layoutSizeItem: Layout) => {
      if (layoutSizeItem.i.startsWith('spacer-')) {
        newGrid.push(
          <div key={layoutSizeItem.i}>
            <CircleFieldViewerContainer
              key={layoutSizeItem.i}
              property={layoutSizeItem.i}
              editingGrid={editingGrid}
            >
              <span className={classes.spacerText}>
                {editingGrid ? 'Spacer' : ''}
              </span>
            </CircleFieldViewerContainer>
          </div>,
        );
      }
    },
  );

  return (
    <div className={classes.container}>
      {editingGrid && displaySize && setCircleLayouts && (
        <AddToGrid
          circle={circle}
          circleLayouts={circleLayouts}
          displaySize={displaySize}
          editingGrid={editingGrid}
          setCircleLayouts={setCircleLayouts}
        />
      )}
      <ResponsiveGridLayout
        measureBeforeMount={true}
        useCSSTransforms={false}
        className={classNames}
        layouts={circleLayouts.data.layouts}
        onLayoutChange={handleLayoutChange}
        // autoSize={true}
        // rowHeight={muiTheme.spacing(1) / 2}
        // onResize={this.onResize}
        isDraggable={editingGrid ? true : false}
        isResizable={editingGrid ? true : false}
        breakpoints={{
          xl: theme.breakpoints.values.xl,
          lg: theme.breakpoints.values.lg,
          md: theme.breakpoints.values.md,
          sm: theme.breakpoints.values.sm,
          xs: theme.breakpoints.values.xs,
        }}
        cols={{ xl: 64, lg: 48, md: 32, sm: 24, xs: 12 }}
        maxRows={1000}
        margin={[0, 0]}
        rowHeight={theme.spacing()}
        // draggableCancel="input,textarea,label"
      >
        {newGrid}
      </ResponsiveGridLayout>
    </div>
  );
};

export default ReactGridLayoutViewer;
