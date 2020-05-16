import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { Circle } from '@myiworlds/types';
import { unEditableFields } from '../../../../constants/circleFieldsStrings';

interface Props {
  circle: Circle;
  setFieldEditing: (newFieldEditing: string | null) => void;
}

const CircleFieldsController: React.FC<Props> = ({
  circle,
  setFieldEditing,
}) => {
  const renderObject = (obj: any): any => {
    const renderElements = [];
    for (const [property] of Object.entries(obj)) {
      if (!unEditableFields.includes(property)) {
        renderElements.push(
          <ListItem
            key={property}
            onClick={() => setFieldEditing(property)}
            button
          >
            <ListItemText primary={property} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => setFieldEditing(property)}
              >
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>,
        );
      }
    }

    return <>{renderElements}</>;
  };

  return <List>{renderObject(circle)}</List>;
};

export default CircleFieldsController;
