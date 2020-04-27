import BasicThemeEditor from './BasicThemeEditor';
import React, { useContext, useEffect } from 'react';
import ThemeViewer from './../Viewer/ThemeViewer';
import { Circle } from '@myiworlds/types';
import { UserInterfaceContext } from './../../../contexts/UserInterface/UserInterfaceContext';

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
  setCanSave: (bool: boolean) => void;
}

const ThemeEditor: React.FC<Props> = ({ circle, updateCircle, setCanSave }) => {
  const { setNavItems, setNavWidth } = useContext(UserInterfaceContext);

  const updateEditor = () => {
    const navItems = (
      <BasicThemeEditor circle={circle} updateCircle={updateCircle} />
    );
    setNavWidth(600);
    setNavItems(navItems);

    return () => {
      if (setNavItems) {
        setNavItems(null);
      }
    };
  };

  useEffect(updateEditor, [circle.data.theme]);

  return <ThemeViewer circle={circle} setCanSave={setCanSave} />;
};

export default ThemeEditor;
