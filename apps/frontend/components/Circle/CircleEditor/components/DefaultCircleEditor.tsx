import CircleFieldsMapperEditor from './CircleFieldsMapperEditor';
import CircleFieldsMapperViewer from './../../CircleViewer/CircleFieldsMapperViewer';
import React, { useContext, useEffect } from 'react';
import { Circle } from '@myiworlds/types';
import { UserInterfaceContext } from '../../../../contexts/UserInterface/UserInterfaceContext';

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
}

const DefaultCircleEditor: React.FC<Props> = ({ circle, updateCircle }) => {
  const { setNavItems, setNavWidth } = useContext(UserInterfaceContext);

  const updateEditor = () => {
    const navItems = (
      <CircleFieldsMapperEditor circle={circle} updateCircle={updateCircle} />
    );
    setNavWidth(400);
    setNavItems(navItems);

    return () => {
      if (setNavItems) {
        setNavItems(null);
      }
    };
  };

  useEffect(updateEditor, [circle]);

  return <CircleFieldsMapperViewer circle={circle} />;
};

export default DefaultCircleEditor;
