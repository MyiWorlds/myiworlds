import React from 'react';
import Switch from '@material-ui/core/Switch';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../../../../atoms/circleWithIdState';
import { useRecoilState } from 'recoil';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';

interface Props {
  property: keyof Circle;
  circleId: string;
  formControlLabelProps: FormControlLabelProps;
}

export default function BooleanEditor({
  circleId,
  formControlLabelProps,
  property,
}: Props) {
  const [circleEditing, setCircleEditing] = useRecoilState(
    circleWithId(circleId + property),
  );

  console.log(
    'Boolean Editor rendered with the following props: ',
    circleId,
    formControlLabelProps,
    property,
    circleEditing,
  );
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCircleEditing(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        {...formControlLabelProps}
        control={<Switch checked={!!circleEditing} onChange={onChange} />}
      />
    </div>
  );
}
