import BooleanEditor from '../../components/Boolean/Editor/BooleanEditor';
import BooleanViewer from '../../components/Boolean/Viewer/BooleanViewer';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NumberEditor from '../../components/Number/Editor/NumberEditor';
import NumberViewer from '../../components/Number/Viewer/NumberViewer';
import React from 'react';
import RichTextEditor from '../../components/RichText/Editor/RichTextEditor';
import RichTextViewer from '../../components/RichText/Viewer/RichTextViewer';
import Select from '@material-ui/core/Select';
import StringEditor from '../../components/String/Editor/StringEditor';
import StringViewer from '../../components/String/Viewer/StringViewer';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export interface State {
  circle: Circle;
}

export interface UpdateCircleFieldAction {
  type: 'UPDATE-CIRCLE-FIELD';
  payload: {
    circle: Circle;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

function reducer(state: State, action: UpdateCircleFieldAction): State {
  if (!action.type) return state;
  switch (action.type) {
    case 'UPDATE-CIRCLE-FIELD':
      return {
        ...state,
        circle: {
          ...state.circle,
          ...action.payload.circle,
        },
      };
    default: {
      console.error('Reducer got unusable command');
      return state;
    }
  }
}

export default function List() {
  const [{ circle }, dispatch] = React.useReducer(reducer, {
    circle: { id: 'aklsdjfl' } as Circle,
  });
  // const [string] = React.useState('');
  const [number, setNumber] = React.useState(0);
  const [boolean, setBoolean] = React.useState(false);
  const [type, setType] = React.useState('TEXT-EDITOR');
  const [isEditing, setIsEditing] = React.useState(true);
  const classes = useStyles();
  const childRef = React.useRef() as any;

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  const handleActivateEditMode = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (childRef?.current?.handleBeforeSave) {
      const updatedCircle = childRef.current.handleBeforeSave();

      dispatch({
        type: 'UPDATE-CIRCLE-FIELD',
        payload: {
          circle: {
            id: circle.id,
            ...updatedCircle,
          },
        },
      });
    }

    setIsEditing(false);
  };

  const updateCircleField = (field: keyof Circle, value: any) => {
    dispatch({
      type: 'UPDATE-CIRCLE-FIELD',
      payload: {
        circle: {
          id: circle.id,
          [field]: value,
        },
      },
    });
  };

  let content = null;

  switch (type) {
    case 'STRING':
      content = isEditing ? (
        <StringEditor
          property="String"
          value={circle.string || ''}
          field="string"
          setValue={updateCircleField}
        />
      ) : (
        <StringViewer string={circle.string || ''} />
      );

      break;
    case 'NUMBER':
      content = isEditing ? (
        <NumberEditor
          property="Number"
          value={number}
          setValue={v => setNumber(v)}
        />
      ) : (
        <NumberViewer number={number} />
      );
      break;
    case 'BOOLEAN':
      content = isEditing ? (
        <BooleanEditor
          property="Boolean"
          value={boolean}
          setValue={v => setBoolean(v)}
        />
      ) : (
        <BooleanViewer label={'boolean'} boolean={boolean} />
      );
      break;
    case 'TEXT-EDITOR':
      content = isEditing ? (
        <RichTextEditor
          string={circle.string || ''}
          setValue={v =>
            dispatch({
              type: 'UPDATE-CIRCLE-FIELD',
              payload: {
                circle: {
                  id: circle.id,
                  string: v,
                },
              },
            })
          }
          // string={string}
          // setValue={(v: string) => setString(v)}
          // value={richText} setValue={setRichText}
          ref={childRef}
        />
      ) : (
        <RichTextViewer string={circle.string} />
      );
      break;
    default:
      content = <h1>Nothing was given</h1>;
      break;
  }

  const typeSelector = (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={type}
        onChange={handleChange}
      >
        <MenuItem value={'STRING'}>String</MenuItem>
        <MenuItem value={'NUMBER'}>Number</MenuItem>
        <MenuItem value={'BOOLEAN'}>Boolean</MenuItem>
        <MenuItem value={'TEXT-EDITOR'}>Text Editor</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <div>
      {typeSelector}
      <Button onClick={handleActivateEditMode}>Edit</Button>
      <Button onClick={handleSave}>Save</Button>
      <br />
      <br />
      {content}
    </div>
  );
}
