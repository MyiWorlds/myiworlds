import BooleanEditor from '../../../../Boolean/Editor/BooleanEditor';
import NumberEditor from '../../../../Number/Editor/NumberEditor';
import React from 'react';
import SelectEditor from '../../../../Select/Editor/SelectEditor';
import StringEditor from '../../../../String/Editor/StringEditor';
import { Circle } from '@myiworlds/types';

interface Props {
  circle: Circle;
  path: string[];
  handleUpdate: (path: string[], newValues: any) => void;
}

const CircleFieldEditorBasic: React.FC<Props> = ({
  path,
  circle,
  handleUpdate,
}) => {
  switch (circle.type) {
    case 'BOOLEAN':
      return (
        <BooleanEditor
          property={circle.title || ''}
          value={circle.boolean || false}
          isInList={true}
          setValue={newValue => handleUpdate(path, newValue)}
        />
      );

    case 'STRING':
      return (
        <StringEditor
          property={circle.title || ''}
          value={circle.string || ''}
          setValue={newValue => handleUpdate(path, newValue)}
          canNotCustomizatize={true}
          ui={null}
        />
      );

    case 'NUMBER':
      return (
        <NumberEditor
          property={circle.title || ''}
          value={circle.number || 0}
          setValue={newValue => handleUpdate(path, newValue)}
        />
      );

    case 'SELECT':
      return (
        <SelectEditor
          circle={circle}
          setValue={newValue => handleUpdate(path, newValue)}
          fieldUi={null}
        />
      );

    default:
      return null;
  }
};

export default CircleFieldEditorBasic;
