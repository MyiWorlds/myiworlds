import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedCircleFieldEditingAtom,
  circleFieldIsSelectedSelector,
} from '../../../atoms/circleAtoms';

interface Props {
  property: string;
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
      },
    },
    editingGrid: {
      background: theme.palette.primary.light,
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 2,
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

const Comp = React.memo(
  ({
    isEditing,
    editingGrid,
    property,
    children,
  }: {
    isEditing: boolean;
    editingGrid: boolean;
    property: string;
    children: React.ReactNode;
  }) => {
    const setSelectedFieldEditing = useSetRecoilState(
      selectedCircleFieldEditingAtom,
    );
    const classes = useStyles();

    return (
      <div
        className={classes.container}
        onClick={() => setSelectedFieldEditing(property)}
      >
        {!isEditing ? (
          <div className={classes.clickable}>
            <div className={classes.noPointerEvents}>{children}</div>
          </div>
        ) : (
          <div className={classes.noPointerEvents}>{children}</div>
        )}
        {!isEditing && !editingGrid && (
          <div className={classes.clickableBackground} />
        )}
        {isEditing && (
          <div
            className={`${classes.selected} ${
              editingGrid ? classes.editingAndSelected : ''
            }`}
          />
        )}
        {editingGrid && <div className={classes.editingGrid} />}
      </div>
    );
  },
);

const CircleFieldViewerContainer: React.FunctionComponent<Props> = React.memo(
  ({ property, children, editingGrid }) => {
    const circleFieldIsSelected = useRecoilValue(
      circleFieldIsSelectedSelector({ property }),
    );

    return (
      <Comp
        isEditing={circleFieldIsSelected}
        editingGrid={editingGrid}
        property={property}
      >
        {children}
      </Comp>
    );
  },
);

export default CircleFieldViewerContainer;
