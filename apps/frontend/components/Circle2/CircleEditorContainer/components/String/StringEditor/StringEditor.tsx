import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../../../../../atoms/circleAtoms';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRecoilState } from 'recoil';

interface Props {
  property: keyof Circle;
  circleId: string;
  textFieldProps: TextFieldProps;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: theme.spacing(),
    },
  }),
);

export default function StringEditor({
  circleId,
  textFieldProps,
  property,
}: Props) {
  const [circleFieldEditing, setCircleEditing] = useRecoilState(
    circleWithId(circleId + property),
  );
  const classes = useStyles();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCircleEditing(event.target.value);
  };

  console.log(
    'String Editor rendered with the following props: ',
    circleId,
    textFieldProps,
    property,
    circleFieldEditing,
  );

  return (
    <div className={classes.container}>
      <TextField
        key={property}
        defaultValue={circleFieldEditing ? circleFieldEditing : ''}
        onChange={onChange}
        autoFocus={true}
        {...textFieldProps}
      />
    </div>
  );
}
