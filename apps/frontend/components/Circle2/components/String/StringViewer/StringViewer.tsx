import React from 'react';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../../../../atoms/circleWithIdState';
import { useRecoilValue } from 'recoil';

interface Props {
  property: keyof Circle;
  circleId: string;
  stringProperties: React.HTMLAttributes<HTMLSpanElement>;
}

export default function StringViewer({
  property,
  circleId,
  stringProperties,
}: Props) {
  const circleEditing = useRecoilValue(circleWithId(circleId));

  return (
    <div>
      <span {...stringProperties}>{circleEditing[property]}</span>
    </div>
  );
}
