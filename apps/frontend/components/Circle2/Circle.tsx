import CircleEditor from './components/CircleEditor';
import CircleViewer from './components/CircleViewer';
import React from 'react';
import { Circle } from '@myiworlds/types';
// import circleWithIdState from '../../atoms/circleWithIdState';
// import {
//   // atom,
//   // useRecoilState,
//   useRecoilValue,
// } from 'recoil';

interface Props {
  isEditing?: boolean;
  fetch?: boolean;
  circle: Circle;
}

// const circleWithIDState = (id: string) =>
//   React.memo(
//     atom<Circle>({
//       key: id,
//       default: {
//         id: id,
//         title: 'title',
//       },
//     }) as any,
//   ) as any;

export default function CircleComponent({ isEditing, circle, fetch }: Props) {
  // const circleEditing = useRecoilValue(circleWithIdState(circle.id));

  // setCircleEditing

  // const setCircleEditing = useRecoilState(circleWithIDState(circle.id));
  // const circleEditing = useRecoilValue(circleWithIDState(circle.id));

  const [inputValue, setInputValue] = React.useState('');

  const addItem = () => {
    // setCircleEditing({
    //   // ...circleEditing,
    //   id: circle.id,
    //   title: inputValue,
    // });
    setInputValue('');
  };

  const onChange = ({ target: { value } }: { target: { value: string } }) => {
    alert(value);
    setInputValue(value);
  };

  // console.log(circleEditing, fetch);
  return (
    <>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
      {isEditing ? <CircleEditor /> : <CircleViewer />}
    </>
  );
}
