import CircleField from '../CircleField';
import React from 'react';
import { CircleHydrated } from '@myiworlds/types';
import { selectedCircleFieldEditingAtom } from '../../../../../atoms/circleAtoms';
import { useRecoilValue } from 'recoil';

interface Props {
  circle: CircleHydrated;
  viewingHistory: boolean;
}

export default function ContentEditor({ viewingHistory, circle }: Props) {
  console.log(
    'ContentEditor do something with "viewingHistory"',
    viewingHistory,
  );
  const selectedCircleFieldEditing = useRecoilValue(
    selectedCircleFieldEditingAtom,
  );

  let contentEditor = null;

  if (viewingHistory) {
    contentEditor = <div>history </div>;
  } else if (selectedCircleFieldEditing) {
    contentEditor = (
      <div>
        <CircleField
          circle={circle}
          field={selectedCircleFieldEditing}
          isEditing={true}
        />
        <h1>{selectedCircleFieldEditing}</h1>
        <div>Other</div>
        <div>components</div>l
      </div>
    );
  }

  return contentEditor;
}
