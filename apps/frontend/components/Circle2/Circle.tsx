import CircleEditor from './components/CircleEditor';
import CircleField from './CircleField';
import React, { useEffect } from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  fetch?: boolean;
  circle: CircleHydrated;
  initialIsEditing: boolean;
}

// Shouldnt this be determined by the layout for fields shown
const fieldsDisplayed = [
  'type',
  'parent',
  'cached',
  'cache',
  'pii',
  'clonedFrom',
  'copiedFrom',
  'copiedFromClone',
  'autoUpdate',
  'slug',
  'public',
  'passwordRequired',
  'tags',
  'title',
  'subtitle',
  'description',
  'media',
  'creator',
  'owner',
  'viewers',
  'editors',
  'ui',
  'layouts',
  'dateCreated',
  'dateUpdated',
  'key',
  'string',
  'data',
  'number',
  'bigNumber',
  'boolean',
  'date',
  'geoPoint',
  'line',
  'lines',
];

export default function CircleComponent({
  circle,
  fetch,
  initialIsEditing,
}: Props) {
  const fetchCircle = () => {
    if (fetch) {
      console.log('Fetch the circle');
    }
  };
  useEffect(fetchCircle, [fetch]);

  const components = (props: { isEditing: boolean }) => (
    <div>
      {fieldsDisplayed.map((field: keyof CircleHydrated) => (
        <CircleField
          key={circle.id + field}
          field={field}
          isEditing={props.isEditing}
          circle={circle}
        />
      ))}
    </div>
  );

  return (
    <CircleEditor
      id={circle.id}
      initialIsEditing={initialIsEditing}
      editor={components}
      viewer={components}
    />
  );
}
