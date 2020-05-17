import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  property: string;
  setFieldEditing?: (newFieldEditing: string | null) => void;
  // children: React.ReactElement;
  fieldEditing?: string | null;
  editingGrid?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.primary.light,
      opacity: 0.5,
      zIndex: 1,
      boxShadow: theme.shadows[3],
    },
    container: {
      height: '100%',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    clickable: {
      height: '100%',
      width: '100%',
    },
    noPointerEvents: {
      pointerEvents: 'none',
      position: 'relative',
      zIndex: 100,
    },
    clickableBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      cursor: 'pointer',
      '&:hover': {
        borderRadius: theme.shape.borderRadius,
        background: theme.palette.primary.light,
        opacity: 0.4,
        // zIndex: -1,
      },
    },
    editingGrid: {
      background: theme.palette.primary.light,
      opacity: 0.4,
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
    },
    editingAndSelected: {
      cursor: 'grab',
      '&:active': {
        cursor: 'grabbing',
      },
    },
  }),
);

const CircleFieldViewerContainer: React.FunctionComponent<Props> = ({
  property,
  setFieldEditing,
  fieldEditing,
  children,
  editingGrid,
}) => {
  const classes = useStyles();

  if (setFieldEditing) {
    return (
      <div
        className={classes.container}
        onClick={() => setFieldEditing(property)}
      >
        {fieldEditing !== property ? (
          <div className={classes.clickable}>
            <div className={classes.noPointerEvents}>{children}</div>
          </div>
        ) : (
          <div className={classes.noPointerEvents}>{children}</div>
        )}
        {fieldEditing !== property && !editingGrid && (
          <div className={classes.clickableBackground} />
        )}
        {fieldEditing === property && (
          <div
            className={`${classes.selected} ${
              editingGrid ? classes.editingAndSelected : ''
            }`}
          />
        )}
        {editingGrid && <div className={classes.editingGrid} />}
      </div>
    );
  } else {
    return <div className={classes.container}>{children}</div>;
  }
};

export default CircleFieldViewerContainer;
