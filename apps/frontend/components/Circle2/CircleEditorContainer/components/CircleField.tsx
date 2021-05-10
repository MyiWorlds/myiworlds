import Boolean from './Boolean';
import CircleEditorContainer from '../CircleEditorContainer';
import React from 'react';
import String from './String';
import { CircleHydrated } from '@myiworlds/types';
import { circleWithId } from '../../../../atoms/circleAtoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSetRecoilState } from 'recoil';
import {
  stringFields,
  booleanFields,
  circleFields,
} from '../../../../constants/circleFieldsStrings';

interface Props {
  isEditing: boolean;
  field: keyof CircleHydrated;
  circle: CircleHydrated;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fieldContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      position: 'relative',
      '&:hover $editButton': {
        opacity: 1,
      },
    },
    root: {
      width: '100%',
    },
    btn: {
      margin: theme.spacing(1),
    },
    appBar: {},
    toolbar: {
      display: 'flex',
      flexDirection: 'row',
    },
  }),
);

export default function CircleField({ field, isEditing, circle }: Props) {
  const classes = useStyles();
  const setFieldState = useSetRecoilState(circleWithId(circle.id + field));

  const updateAtomWithCircleFieldData = () => {
    setFieldState(circle[field]);
  };
  React.useEffect(updateAtomWithCircleFieldData, [circle, field]);

  let display = <div>Create component for me {field}</div>;

  if (stringFields.includes(field)) {
    display = (
      <String
        parentIsEditing={isEditing}
        circleId={circle.id}
        property={field}
        stringProperties={{
          style: {
            fontSize: 18,
          },
        }}
        textFieldProps={{
          label: field.charAt(0).toUpperCase() + field.slice(1),
          variant: 'outlined',
          fullWidth: true,
        }}
      />
    );
  } else if (booleanFields.includes(field)) {
    display =
      booleanFields.includes(field) !== null ||
      booleanFields.includes(field) !== undefined ? (
        <Boolean
          parentIsEditing={isEditing}
          circleId={circle.id}
          property={field}
          formControlLabelProps={{
            label: field.charAt(0).toUpperCase() + field.slice(1),
            control: null,
            style: {
              fontSize: 42,
              color: 'white',
              fontWeight: 700,
            },
          }}
        />
      ) : null;
  } else if (circleFields.includes(field)) {
    if (circle[field]) {
      display = (
        <CircleEditorContainer
          initialIsEditing={false}
          circle={circle[field]}
          fetch={true}
        />
      );
    } else {
      display = <div>Add Circle connecting logic for field {field}?</div>;
    }
  }
  return <div className={classes.fieldContainer}>{display}</div>;
}
