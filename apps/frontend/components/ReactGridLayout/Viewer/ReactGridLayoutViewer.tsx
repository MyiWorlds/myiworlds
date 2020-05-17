import CircleFieldViewer from './../../Circle/CircleViewer/CircleFieldViewer';
import React, { useContext, useEffect, useState } from 'react';
import { Circle } from '@myiworlds/types';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';
import {
  // createStyles,
  // makeStyles,
  useTheme,
  // Theme,
} from '@material-ui/core/styles';
import {
  Layout,
  Responsive,
  // ResponsiveProps,
  WidthProvider,
  ItemCallback,
} from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  circle: Circle;
  circleLayouts: Circle;
  displaySize?: null | number;
  editingGrid?: boolean;
  setFieldEditing?: (newFieldEditing: string | null) => void;
  setCircleLayouts?: (newValues: Circle) => void;
  fieldEditing?: string | null;
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     container: {
//       position: 'relative',
//       margin: '0 auto',
//       maxWidth: '100%',
//       // paddingBottom: theme.spacing(12)
//     },
//     gridItem: {
//       border: `1px solid ${theme.palette.divider}`,
//       borderRadius: theme.shape.borderRadius,
//     },
//     contentWrapper: {
//       position: 'relative',
//       display: 'flex',
//       height: '100%',
//       margin: theme.spacing(1),
//     },
//     gridItemContentCover: {
//       width: '100%',
//       height: '100%',
//       position: 'absolute',
//       background: theme.palette.primary.main,
//       opacity: 0.3,
//       zIndex: 998,
//     },
//     gridItemPreventClickThrough: {
//       pointerEvents: 'none',
//       cursor: 'default',
//       display: 'block',
//     },
//     dragArea: {
//       position: 'absolute',
//       display: 'block',
//       zIndex: 999,
//       top: 0,
//       right: 0,
//       opacity: 0.4,
//       margin: theme.spacing(1) / 2,
//     },
//   }),
// );

const ReactGridLayoutViewer: React.FC<Props> = ({
  circle,
  circleLayouts,
  displaySize,
  editingGrid,
  setFieldEditing,
  fieldEditing,
  setCircleLayouts,
}) => {
  // const classes = useStyles();
  const theme = useTheme();
  const { navWidth, isResizingNav } = useContext(UserInterfaceContext);
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
    if (!isResizingNav) {
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
  }, [isResizingNav, navWidth, classNames, displaySize]);

  // const children = React.useMemo(() => {
  //   const newGrid: any = [];

  //   for (const [key, value] of Object.entries(circle)) {
  //     const itemInGrid = circleLayouts.data.layouts.xs.find((gridItem: any) => {
  //       return gridItem.i === key && gridItem.w !== 0 && gridItem.h !== 0;
  //     });
  //     if (itemInGrid) {
  //       newGrid.push(
  //         <div key={key}>
  //           <CircleFieldViewer
  //             property={key}
  //             value={value}
  //             circle={circle}
  //             setFieldEditing={setFieldEditing}
  //             fieldEditing={fieldEditing}
  //             editingGrid={editingGrid}
  //           />
  //         </div>,
  //       );
  //     }
  //   }
  //   return newGrid;
  // }, [
  //   circle,
  //   circleLayouts.data.layouts.xs,
  //   setFieldEditing,
  //   fieldEditing,
  //   editingGrid,
  // ]);

  if (!showGrid) {
    return null;
  }

  const newGrid: any = [];

  for (const [key, value] of Object.entries(circle)) {
    const itemInGrid = circleLayouts.data.layouts.xs.find((gridItem: any) => {
      return gridItem.i === key && gridItem.w !== 0 && gridItem.h !== 0;
    });
    if (itemInGrid) {
      newGrid.push(
        <div key={key}>
          <CircleFieldViewer
            property={key}
            value={value}
            circle={circle}
            setFieldEditing={setFieldEditing}
            fieldEditing={fieldEditing}
            editingGrid={editingGrid}
          />
        </div>,
      );
    }
  }

  return (
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
  );
};

export default ReactGridLayoutViewer;
