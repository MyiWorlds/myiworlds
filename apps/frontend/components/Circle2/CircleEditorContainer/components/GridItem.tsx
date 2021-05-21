import CircleField from './CircleField';
import React from 'react';
import { CircleHydrated } from '@myiworlds/types';
import { selectedCircleFieldEditingAtom } from '../../../../atoms/circleAtoms';
import { useSetRecoilState } from 'recoil';

interface Props {
  circle: CircleHydrated;
  field: keyof CircleHydrated;
}

export default function GridItem({ circle, field }: Props) {
  const setSelectedCircleFieldEditing = useSetRecoilState(
    selectedCircleFieldEditingAtom,
  );
  // set selected item

  return (
    <div onClick={() => setSelectedCircleFieldEditing(field)}>
      <CircleField
        key={circle.id + field}
        field={field}
        isEditing={false}
        circle={circle}
      />
    </div>
  );
}
