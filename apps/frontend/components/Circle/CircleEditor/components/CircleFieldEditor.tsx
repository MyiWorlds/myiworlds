import BooleanEditor from '../../../Boolean/Editor/BooleanEditor';
import CircleCloneListItemViewer from './CircleCloneListItemViewer';
import CircleListItemViewer from './CircleListItemViewer';
import CircleListViewer from './CircleListViewer';
import List from '@material-ui/core/List';
import NumberEditor from '../../../Number/Editor/NumberEditor';
import ProfileListItemViewer from '../../../Profile/Viewer/ProfileListItemViewer';
import React from 'react';
import StringEditor from '../../../String/Editor/StringEditor';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { format } from 'date-fns';
import { setDeep } from '@myiworlds/helper-functions';
import {
  circleFields,
  circleListFields,
  profileFields,
  profileListFields,
  stringFields,
  numberFields,
  booleanFields,
  dateDisplayFields,
} from '../../../../constants/circleFieldsStrings';

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
  parentStrings?: string[];
  originalCircle?: Circle;
  property: string;
  value: any;
  fieldUi: Circle | null;
  setCircleUi: (newValues: Circle) => void;
}

const CircleFieldEditor: React.FC<Props> = ({
  circle,
  originalCircle,
  updateCircle,
  parentStrings = [],
  property,
  value,
  fieldUi,
  setCircleUi,
}) => {
  const updateValue = (newValue: string | number | boolean) => {
    let updatedObject: any = null;
    if (originalCircle) {
      updatedObject = {
        ...originalCircle,
      };
    } else {
      updatedObject = {
        ...circle,
      };
    }

    if (parentStrings.length) {
      setDeep(updatedObject, parentStrings, property, newValue, true);
    } else {
      updatedObject[property] = newValue;
    }

    updateCircle(updatedObject);
  };

  if (circleFields.includes(property) && value !== null) {
    const circleDisplay = (
      <div key={property}>
        <Typography variant="caption">{property}:</Typography>
        {circle.copiedFromClone ? (
          <CircleCloneListItemViewer id={value as string} />
        ) : (
          <CircleListItemViewer id={value as string} />
        )}
      </div>
    );
    return circleDisplay;
  } else if (circleListFields.includes(property) && value !== null) {
    return (
      <span key={property}>
        <Typography variant="caption">{property}:</Typography>
        <CircleListViewer ids={value as string[]} />
      </span>
    );
  } else if (profileFields.includes(property) && value !== null) {
    return (
      <span key={`${parentStrings}-${property}`}>
        <Typography variant="caption">{property}:</Typography>
        <List>
          <ProfileListItemViewer id={value as string} />
        </List>
      </span>
    );
  } else if (profileListFields.includes(property) && value && value.length) {
    const profiles = (value as string[]).map((id: string) => (
      <ProfileListItemViewer key={id} id={id} />
    ));

    return (
      <span key={`${parentStrings}-${property}`}>
        <Typography variant="caption">{property}:</Typography>
        <List>{profiles}</List>
      </span>
    );
  } else if (stringFields.includes(property)) {
    return (
      <div key={`${parentStrings}-${property}`}>
        <StringEditor
          property={property}
          field={property as keyof Circle}
          value={value as string}
          setValue={updateValue}
          ui={fieldUi}
          setCircleUi={setCircleUi}
        />
      </div>
    );
  } else if (numberFields.includes(property)) {
    return (
      <div key={`${parentStrings}-${property}`}>
        <NumberEditor
          property={property}
          value={value as number}
          setValue={updateValue}
        />
      </div>
    );
  } else if (booleanFields.includes(property)) {
    return (
      <div key={`${parentStrings}-${property}`}>
        <BooleanEditor
          property={property}
          value={value as boolean}
          setValue={updateValue}
        />
      </div>
    );
  } else if (Array.isArray(value)) {
    return <div key={`${parentStrings}-${property}`}>ArrayEditor</div>;
  } else if (dateDisplayFields.includes(property)) {
    return (
      <span key={`${parentStrings}-${property}`}>
        <Typography variant="caption">{property}:</Typography>
        <Typography>
          {format(value as number, 'MMMM dd, yyyy h:mm a')}
        </Typography>
      </span>
    );
  } else {
    return null;
  }
  // else {
  //   console.log(
  //     'CircleFieldEditor returned did not match anything.  Received: ',
  //     property,
  //     value,
  //   );
  //   return (
  //     <div key={`${parentStrings}-${property}`}>{property}</div>,
  //   );
  // }
};

export default CircleFieldEditor;
