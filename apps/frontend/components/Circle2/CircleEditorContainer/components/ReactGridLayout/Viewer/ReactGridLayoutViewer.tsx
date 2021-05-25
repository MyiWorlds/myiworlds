import AddToGrid from './../Editor/AddToGrid';
import CircleField from '../../CircleField';
import CircleFieldViewerContainer from '../../../../../Circle/CircleViewer/CircleFieldViewerContainer';
import generateDefaultGridLayouts from './gridLayoutHelperFunctions';
import React, { useContext, useEffect, useState } from 'react';
import { Circle } from '@myiworlds/types';
import { contentDisplaySizeAtom } from '../../../../../../atoms/userInterfaceAtoms';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { getCurrentLayoutSize } from './gridLayoutHelperFunctions';
import { useRecoilValue } from 'recoil';
import { UserInterfaceContext } from '../../../../../../contexts/UserInterface/UserInterfaceContext';
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
  isEditingGrid?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: theme.spacing(24),
      height: '100%',
    },
    spacerText: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
);

const ReactGridLayoutViewer: React.FC<Props> = ({ circle, isEditingGrid }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { contentControllerWidth, isResizingContentController } = useContext(
    UserInterfaceContext,
  );
  const displaySize = useRecoilValue(contentDisplaySizeAtom);
  const [classNames, setClassNames] = useState(
    'flex layout bg-white shadow rounded-sm',
  );
  const [showGrid, setShowGrid] = useState(false);
  const [circleLayouts, setCircleLayouts] = useState<Circle | null>({
    id: 'default-circle-layout',
    type: 'LAYOUTS',
    collection: FIRESTORE_COLLECTIONS.CIRCLES,
    data: {
      layouts: generateDefaultGridLayouts(Object.getOwnPropertyNames(circle)),
    },
  });

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
    if (setCircleLayouts && isEditingGrid) {
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
        <CircleFieldViewerContainer
          key={circle.id + key}
          property={key as keyof Circle}
          editingGrid={isEditingGrid}
        >
          <CircleField
            field={key as keyof Circle}
            isEditing={false}
            circle={circle}
          />
        </CircleFieldViewerContainer>,
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
              editingGrid={isEditingGrid}
            >
              <span className={classes.spacerText}>
                {isEditingGrid ? 'Spacer' : ''}
              </span>
            </CircleFieldViewerContainer>
          </div>,
        );
      }
    },
  );

  const rgl = (
    <>
      {isEditingGrid && displaySize && setCircleLayouts && (
        <AddToGrid
          circle={circle}
          circleLayouts={circleLayouts}
          displaySize={displaySize}
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
        isDraggable={isEditingGrid ? true : false}
        isResizable={isEditingGrid ? true : false}
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
    </>
  );

  let content = null;

  if (displaySize) {
    content = (
      <div style={{ width: displaySize, margin: '0px auto', height: '100%' }}>
        {rgl}
      </div>
    );
  } else {
    content = rgl;
  }

  return <div className={classes.container}>{content}</div>;
};

export default ReactGridLayoutViewer;
