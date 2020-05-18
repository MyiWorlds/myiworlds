import ColorListItem from './ColorListItem';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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
}) => {
  const classes = useStyles();
  const [variant, setVariant] = React.useState('h1');

  const handleStringChange = (newValue: string) => {
    setValue(newValue);
  };

  const toggleShowLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  function handleChange(event: React.ChangeEvent<{ value: string }>) {
    setVariant(event.target.value);
  }

  // Add customizations
  const customizations = () => false;

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
    if (!customizations()) {
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
      <div className={classes.textField} key={`${property}`}>
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

        <ListItem>
          <ListItemText primary="Variant" />

          <FormControl>
            <Select value={variant} onChange={handleChange}>
              <MenuItem value={'h1'}>h1</MenuItem>
              <MenuItem value={'h2'}>h2</MenuItem>
              <MenuItem value={'h3'}>h3</MenuItem>
              <MenuItem value={'h4'}>h4</MenuItem>
              <MenuItem value={'h5'}>h5</MenuItem>
              <MenuItem value={'h6'}>h6</MenuItem>
              <MenuItem value={'subtitle1'}>subtitle1</MenuItem>
              <MenuItem value={'subtitle2'}>subtitle2</MenuItem>
              <MenuItem value={'body1'}>body1</MenuItem>
              <MenuItem value={'body2'}>body2</MenuItem>
              <MenuItem value={'overline'}>overline</MenuItem>
              <MenuItem value={'srOnly'}>srOnly</MenuItem>
              <MenuItem value={'button'}>button</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </div>
    );
  }
};

export default StringEditor;
