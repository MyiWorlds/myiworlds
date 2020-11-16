import Button from '@material-ui/core/Button';
import CircleEditor from './components/CircleEditor';
import CircleViewer from './components/CircleViewer';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Circle } from '@myiworlds/types';
import { circleWithId } from '../../atoms/circleWithIdState';
import {
  useRecoilState,
} from 'recoil';

interface Props {
  fetch?: boolean;
  circle: Circle;
}

export default function CircleComponent({ circle, fetch }: Props) {
  const [circleEditing, setCircleEditing] = useRecoilState(circleWithId(circle.id))
  const [isEditing, setIsEditing] = useState(false)
  const createItem = () => {
    console.log('Create')
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event)
    setCircleEditing({
      ...circleEditing,
      [event.target.id]: event.target.value
    });
  };

  const editor = (
    <>
      <Button onClick={() => setIsEditing(false)}>View</Button>
      <TextField
        id="title"
        label={'Title'}
        variant="outlined"
        fullWidth={true}
        value={circleEditing.title}
        onChange={onChange}
      />
      <TextField
        id="subtitle"
        label={'Subtitle'}
        variant="outlined"
        fullWidth={true}
        value={circleEditing.subtitle}
        onChange={onChange}
      />
      <TextField
        id="description"
        label={'Description'}
        variant="outlined"
        fullWidth={true}
        value={circleEditing.description}
        onChange={onChange}
      />
      <TextField
        id="string"
        label={'String'}
        variant="outlined"
        fullWidth={true}
        value={circleEditing.string}
        onChange={onChange}
      />
    </>
  );

  const viewer = (
    <>
      <Button onClick={() => setIsEditing(true)}>Edit</Button>
      <h1>{circleEditing.title}</h1>
      <h3>{circleEditing.subtitle}</h3>
      <p>{circleEditing.description}</p>
      <p>{circleEditing.string}</p>
    </>
  )

  return (
    <div style={{ margin: 8 }}>
      {isEditing ? editor : viewer}
      <br />
      <button onClick={createItem}>Add</button>
      {isEditing ? <CircleEditor /> : <CircleViewer />}
    </div>
  );
}
