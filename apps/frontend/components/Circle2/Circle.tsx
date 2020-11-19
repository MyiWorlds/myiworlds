import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import String from './components/String';
import { Circle } from '@myiworlds/types';

interface Props {
  fetch?: boolean;
  circle: Circle;
}

export default function CircleComponent({ circle, fetch }: Props) {
  const [isEditing, setIsEditing] = useState(true);
  const createItem = () => {
    console.log('Create');
  };

  return (
    <div style={{ margin: 8 }}>
      {isEditing ? (
        <Button onClick={() => setIsEditing(false)}>View</Button>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      )}
      <br />
      <button onClick={createItem}>Add</button>
      <String
        isEditing={isEditing}
        circleId={circle.id}
        property={'title'}
        stringProperties={{
          style: {
            fontSize: 42,
            color: 'white',
            fontWeight: 700,
          },
        }}
        textFieldProps={{
          label: 'Title',
          variant: 'outlined',
          fullWidth: true,
        }}
      />
      <String
        isEditing={isEditing}
        circleId={circle.id}
        property={'string'}
        stringProperties={{
          style: {
            fontSize: 18,
          },
        }}
        textFieldProps={{
          label: 'String',
          variant: 'outlined',
          fullWidth: true,
        }}
      />
    </div>
  );
}
