import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../../../../../atoms/circleAtoms';
import { useRecoilValue } from 'recoil';

interface Props {
  property: keyof Circle;
  circleId: string;
  stringProperties: React.HTMLAttributes<HTMLSpanElement>;
  value?: string;
}

export default function StringViewer({
  property,
  circleId,
  stringProperties,
}: Props) {
  const circleFieldValue = useRecoilValue(circleWithId(circleId + property));
  let text = circleFieldValue;

  if (!text || text === '') {
    text = 'Untitled';
  }

  return <Typography>{text}</Typography>;
}
