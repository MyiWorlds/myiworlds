import React from 'react';
import Switch from '@material-ui/core/Switch';
import { Circle } from '@myiworlds/types';
import { circlePropertyValueByIdAndPropertyAtom } from '../../../../../../atoms/circleAtoms';
import { useRecoilValue } from 'recoil';
import FormControlLabel, {
  FormControlLabelProps,
} from '@material-ui/core/FormControlLabel';

interface Props {
  property: keyof Circle;
  circleId: string;
  formControlLabelProps: FormControlLabelProps;
}

export default function BooleanViewer({
  property,
  circleId,
  formControlLabelProps,
}: Props) {
  const circleFieldValue = useRecoilValue(
    circlePropertyValueByIdAndPropertyAtom(circleId + property),
  );

  return (
    <div>
      <FormControlLabel
        {...formControlLabelProps}
        control={<Switch checked={circleFieldValue || false} disabled />}
      />
    </div>
  );
}
