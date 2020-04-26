import ColorizeIcon from '@material-ui/icons/Colorize';
import ColorPicker from './ColorPicker';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core';

interface Props {
  colorValue: string;
  onChange: (newColor: string) => void;
  label: string;
}

const useStyles = makeStyles({
  textField: {
    cursor: 'pointer',
  },
});

export default function ColorListItem({ colorValue, onChange, label }: Props) {
  const classes = useStyles();
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colorPickerTextField = (
    <TextField
      label={label || ''}
      variant="outlined"
      fullWidth={true}
      value={colorValue}
      disabled={true}
      // onChange={() => {}}
      inputProps={{
        className: classes.textField,
      }}
    />
  );

  return (
    <div>
      <ListItem button onClick={() => setShowColorPicker(!showColorPicker)}>
        <ListItemIcon>
          <Fab size="small" style={{ background: colorValue, zIndex: 99 }}>
            <ColorizeIcon />
          </Fab>
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-dark-theme"
          primary={colorPickerTextField}
        />
      </ListItem>
      <Collapse in={showColorPicker}>
        <ColorPicker colorValue={colorValue} onChange={onChange} />
      </Collapse>
    </div>
  );
}
