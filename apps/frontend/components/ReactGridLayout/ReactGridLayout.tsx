import * as React from 'react';
import generateDefaultGridLayouts from './generateDefaultGridLayouts';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import {
  Layouts,
  Responsive,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Props {
  gridItems: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      margin: '0 auto',
      maxWidth: '100%',
      // paddingBottom: theme.spacing(12)
    },
    gridItem: {
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: theme.shape.borderRadius,
    },
    contentWrapper: {
      position: 'relative',
      display: 'flex',
      height: '100%',
      margin: theme.spacing(1),
    },
    gridItemContentCover: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: theme.palette.primary.main,
      opacity: 0.3,
      zIndex: 998,
    },
    gridItemPreventClickThrough: {
      pointerEvents: 'none',
      cursor: 'default',
      display: 'block',
    },
    dragArea: {
      position: 'absolute',
      display: 'block',
      zIndex: 999,
      top: 0,
      right: 0,
      opacity: 0.4,
      margin: theme.spacing(1) / 2,
    },
  }),
);

const ReactGridLayout: React.FC<Props> = ({ gridItems }) => {
  const classes = useStyles();
  const muiTheme = useTheme();

  const layouts = generateDefaultGridLayouts(
    gridItems.props.children.map((item: any) => item.key),
  );

  return (
    <ResponsiveGridLayout
      measureBeforeMount={true}
      useCSSTransforms={false}
      layouts={layouts}
      // autoSize={true}
      // rowHeight={muiTheme.spacing(1) / 2}
      // onResize={this.onResize}
      isDraggable={false}
      isResizable={false}
      breakpoints={{
        xl: muiTheme.breakpoints.values.xl,
        lg: muiTheme.breakpoints.values.lg,
        md: muiTheme.breakpoints.values.md,
        sm: muiTheme.breakpoints.values.sm,
        xs: muiTheme.breakpoints.values.xs,
      }}
      cols={{ xl: 64, lg: 48, md: 32, sm: 24, xs: 12 }}
      maxRows={124}
      // draggableCancel="input,textarea,label"
    >
      {gridItems.props.children
        ? gridItems.props.children.map((gridItem: any) => gridItem)
        : null}
    </ResponsiveGridLayout>
  );
};

export default ReactGridLayout;
