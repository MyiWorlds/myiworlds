import ColorListItem from './ColorListItem';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import UiEditor from './../../Circle/CircleEditor/components/UiEditor/UiEditor';
import { Circle } from '@myiworlds/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
} from '@material-ui/core';

interface Props {
  property: string;
  value: string;
  setValue: (newValue: string) => void;
  ui: Circle | null;
  canNotCustomizatize?: boolean;
  setCircleUi?: (newValue: Circle) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      padding: theme.spacing(2),
    },
  }),
);

function isColor(strColor: string) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}

const StringEditor: React.FunctionComponent<Props> = ({
  property,
  value,
  setValue,
  ui,
  setCircleUi,
  canNotCustomizatize,
}) => {
  const classes = useStyles();
  console.log('do something with', ui);
  const handleStringChange = (newValue: string) => {
    setValue(newValue);
  };

  const toggleShowLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  const stringUiDefaults: Circle = {
    id: '',
    type: 'UI',
    data: {
      options: {
        showLabel: {
          id: 'show-label',
          title: 'Label',
          type: 'BOOLEAN',
          boolean: false,
        },
        variant: {
          id: 'variant',
          title: 'Variant',
          type: 'SELECT',
          data: {
            items: [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'subtitle1',
              'subtitle2',
              'body1',
              'body2',
              'overline',
              'srOnly',
              'button',
            ],
          },
        },
      },
      styles: {
        // container: {

        // },
        label: {
          fontColor: {
            id: 'fontColor',
            title: 'Font Color',
            type: 'STRING',
            string: 'red',
          },
        },
        string: {
          fontColor: {
            id: 'fontColor',
            title: 'Font Color',
            type: 'STRING',
            string: 'red',
          },
          fontSize: {
            id: 'fontSize',
            title: 'Font Size',
            type: 'String',
            string: '43rem',
          },
        },
      },
    },
  };

  if (isColor(value)) {
    return (
      <ColorListItem
        key={`${property}`}
        label={property || ''}
        onChange={handleStringChange}
        colorValue={value}
      />
    );
  } else {
    if (canNotCustomizatize || !setCircleUi) {
      return (
        <div className={classes.textField} key={`${property}`}>
          <TextField
            id={`${property}`}
            label={property || ''}
            variant="outlined"
            fullWidth={true}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleStringChange(e.target.value)
            }
          />
        </div>
      );
    }
    return (
      <div key={`${property}`}>
        <ListItem>
          <TextField
            id={`${property}`}
            label={property || ''}
            variant="outlined"
            fullWidth={true}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleStringChange(e.target.value)
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText id="switch-show-label" primary="Show label" />

          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={toggleShowLabel}
              checked={true}
              inputProps={{ 'aria-labelledby': 'switch-show-label' }}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <UiEditor
          uiCircle={stringUiDefaults}
          uiValues={ui}
          setCircleUi={setCircleUi}
        />
      </div>
    );
  }
};

export default StringEditor;
