import Avatar from '@material-ui/core/Avatar';
import BooleanEditor from './../../Boolean/Editor/BooleanEditor';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FunctionEditor from './../../Function/Editor/FunctionEditor';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import NumberEditor from './../../Number/Editor/NumberEditor';
import React from 'react';
import StringEditor from './../../String/Editor/StringEditor';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  object: any;
  updateCircle: (newValues: any) => void;
  parentStrings?: string[];
  originalObject?: any;
}

function isFunction(functionToCheck: any) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
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

const ObjectListItem = ({
  property,
  value,
  updateCircle,
  parentStrings,
  originalObject,
}: {
  property: string;
  updateCircle: (newValues: any) => void;
  value: any;
  originalObject: any;
  parentStrings: string[];
}) => {
  const classes = useStyles();
  const [objectOpen, setObjectOpen] = React.useState(false);

  return (
    <>
      <ListItem
        button
        onClick={() => setObjectOpen(!objectOpen)}
        key={`${parentStrings}-${property}`}
      >
        <ListItemAvatar>
          <Avatar className={classes.ddAvatar}>
            {objectOpen ? <ExpandLess /> : <ExpandMore />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={property} />
      </ListItem>
      <Collapse
        in={objectOpen}
        timeout="auto"
        unmountOnExit
        key={`${parentStrings}-${property}-${value}-dd`}
      >
        <div className={classes.nested}>
          <ObjectEditor
            updateCircle={updateCircle}
            object={value}
            originalObject={originalObject}
            parentStrings={parentStrings}
          />
        </div>
      </Collapse>
    </>
  );
};

const ObjectEditor: React.FC<Props> = ({
  object,
  originalObject,
  updateCircle,
  parentStrings = [],
}) => {
  const renderObject = (obj: any): any => {
    const renderElements = [];
    for (const [property, value] of Object.entries(obj)) {
      const updateValue = (newValue: string | number | boolean) => {
        let updatedObject: any = null;
        if (originalObject) {
          updatedObject = {
            ...originalObject,
          };
        } else {
          updatedObject = {
            ...object,
          };
        }

        if (parentStrings.length) {
          const test = setDeep(
            updatedObject,
            parentStrings,
            property,
            newValue,
            true,
          );
          console.log(test);
        } else {
          updatedObject[property] = newValue;
        }

        updateCircle(updatedObject);
      };

      if (typeof value === 'object' && value !== null) {
        renderElements.push(
          <ObjectListItem
            key={`${parentStrings}-${property}`}
            originalObject={originalObject ? originalObject : object}
            property={property}
            value={value}
            updateCircle={updateCircle}
            parentStrings={[...parentStrings, property]}
          />,
        );
      } else if (typeof value === 'string') {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <StringEditor
              property={property}
              value={value}
              setValue={updateValue}
            />
          </div>,
        );
      } else if (typeof value === 'number') {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <NumberEditor
              property={property}
              value={value}
              setValue={updateValue}
            />
          </div>,
        );
      } else if (typeof value === 'boolean') {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <BooleanEditor
              property={property}
              value={value}
              setValue={updateValue}
              isInList={true}
            />
          </div>,
        );
      } else if (Array.isArray(value)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>ArrayEditor</div>,
        );
      } else if (isFunction(value)) {
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>
            <FunctionEditor
              property={property}
              value={value && value.toString() ? value.toString() : ''}
              setValue={updateValue}
            />
          </div>,
        );
      } else {
        console.log('Returned nothing...  Something got in here');
        renderElements.push(
          <div key={`${parentStrings}-${property}`}>EDITOR</div>,
        );
      }
    }

    return <>{renderElements}</>;
  };

  return <List>{renderObject(object)}</List>;
};

export default ObjectEditor;
