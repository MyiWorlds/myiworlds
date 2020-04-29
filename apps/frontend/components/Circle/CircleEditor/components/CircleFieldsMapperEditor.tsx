import BooleanEditor from '../../../Boolean/Editor/BooleanEditor';
import CircleListItemViewer from './CircleListItemViewer';
import List from '@material-ui/core/List';
import NumberEditor from '../../../Number/Editor/NumberEditor';
import ProfileListItemViewer from '../../../Profile/Viewer/ProfileListItemViewer';
import React from 'react';
import StringEditor from '../../../String/Editor/StringEditor';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { format } from 'date-fns';

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
  parentStrings?: string[];
  originalCircle?: Circle;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    ddAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  }),
);

function setDeep(
  obj: any,
  path: string[],
  property: string,
  value: any,
  setrecursively = false,
) {
  path.reduce((a: any, b: any, level: any) => {
    if (
      setrecursively &&
      typeof a[b] === 'undefined' &&
      level !== path.length
    ) {
      a[b] = {};
      return a[b];
    }

    if (level === path.length - 1) {
      a[b] = {
        ...a[b],
        [property]: value,
      };
      return value;
    }
    return a[b];
  }, obj);
}

const CircleFieldsMapperEditor: React.FC<Props> = ({
  circle,
  originalCircle,
  updateCircle,
  parentStrings = [],
}) => {
  const renderObject = (obj: any): any => {
    const renderElements = [];
    for (const [property, value] of Object.entries(obj)) {
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

      const circleFields = [
        'parent',
        'cache',
        'copiedFrom',
        'media',
        'ui',
        'line',
      ];
      const circleListFields = ['lines'];
      const profileFields = ['creator', 'owner'];
      const profileListFields = ['editors', 'viewers'];
      const stringFields = [
        'slug',
        'type',
        'title',
        'subtitle',
        'description',
        'key',
        'string',
        'geoPoint',
      ];
      const stringListFields = ['tags'];
      const booleanFields = [
        'cached',
        'pii',
        'autoUpdate',
        'public',
        'passwordRequired',
        'boolean',
      ];
      const numberFields = ['number'];
      const dateFields = ['date'];
      const dateDisplayFields = ['dateCreated', 'dateUpdated'];

      if (circleFields.includes(property) && value !== null) {
        const circleDisplay = (value as string[]).map((id: string) => (
          <div key={`${parentStrings}-${property}`}>
            <Typography variant="caption">{property}:</Typography>
            <CircleListItemViewer id={id} />
          </div>
        ));
        renderElements.push(circleDisplay);
      } else if (circleListFields.includes(property) && value !== null) {
        const circles = (value as string[]).map((id: string) => (
          <CircleListItemViewer key={id} id={id} />
        ));

        renderElements.push(
          <span key={`${parentStrings}-${property}`}>
            <Typography variant="caption">{property}:</Typography>
            <List>{circles}</List>
          </span>,
        );
      } else if (profileFields.includes(property) && value !== null) {
        renderElements.push(
          <span key={`${parentStrings}-${property}`}>
            <Typography variant="caption">{property}:</Typography>
            <List>
              <ProfileListItemViewer id={value} />
            </List>
          </span>,
        );
      } else if (
        profileListFields.includes(property) &&
        value &&
        value.length
      ) {
        const profiles = (value as string[]).map((id: string) => (
          <ProfileListItemViewer key={id} id={id} />
        ));

        renderElements.push(
          <span key={`${parentStrings}-${property}`}>
            <Typography variant="caption">{property}:</Typography>
            <List>{profiles}</List>
          </span>,
        );
      } else if (stringFields.includes(property)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <StringEditor
              property={property}
              value={value as string}
              setValue={updateValue}
            />
          </div>,
        );
      } else if (numberFields.includes(property)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <NumberEditor
              property={property}
              value={value as number}
              setValue={updateValue}
            />
          </div>,
        );
      } else if (booleanFields.includes(property)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <BooleanEditor
              property={property}
              value={value as boolean}
              setValue={updateValue}
            />
          </div>,
        );
      } else if (Array.isArray(value)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>ArrayEditor</div>,
        );
      } else if (dateDisplayFields.includes(property)) {
        renderElements.push(
          <span>
            <Typography variant="caption">{property}:</Typography>
            <Typography>
              {format(value as number, 'MMMM dd, yyyy h:mm a')}
            </Typography>
          </span>,
        );
      } else {
        console.log('Returned nothing.  Received: ', property, value);
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>{property}</div>,
        );
      }
    }

    return <>{renderElements}</>;
  };

  return <List>{renderObject(circle)}</List>;
};

export default CircleFieldsMapperEditor;
