import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../../../../atoms/circleWithIdState';
import { useRecoilState } from 'recoil';

interface Props {
  property: keyof Circle;
  circleId: string;
  textFieldProps: TextFieldProps;
}

export default function StringEditor({
  circleId,
  textFieldProps,
  property,
}: Props) {
  const [circleEditing, setCircleEditing] = useRecoilState(
    circleWithId(circleId),
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCircleEditing({
      ...circleEditing,
      [property]: event.target.value,
    });
  };

  return (
    <div>
      <TextField
        value={circleEditing[property]}
        onChange={onChange}
        {...textFieldProps}
      />
    </div>
  );
}
