import React from 'react';

export default function GridItem() {
  const setSelectedCircleFieldEditing = useRecoilValue(
    selectedCircleFieldEditingAtom,
  );
  // set selected item

  return (
    <div onClick={setSelectedCircleFieldEditing()}>
      <CircleField
        key={circle.id + field}
        field={field}
        isEditing={false}
        circle={circle}
      />
    </div>
  );
}
