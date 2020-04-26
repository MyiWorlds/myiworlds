import ColorizeIcon from '@material-ui/icons/Colorize';
import ColorPicker from './ColorPicker';
import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
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
  colorName: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    colorIcon: {
      background: (props: any) => props.colorValue,
      zIndex: 99,
      width: 32,
      height: 32, minHeight: 32
    }
  }),
);

export default function ColorListItem({
  colorValue,
  onChange,
  colorName,
}: Props) {
  const classes = useStyles({colorValue});
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div>
      <ListItem button onClick={() => setShowColorPicker(!showColorPicker)}>
        <ListItemIcon>
          <Fab size="small" className={classes.colorIcon}>
            <ColorizeIcon />
          </Fab>
        </ListItemIcon>
        <ListItemText id="switch-list-label-dark-theme" primary={colorName} />
      </ListItem>
      <Collapse in={showColorPicker}>
        <ColorPicker colorValue={colorValue} onChange={onChange} />
      </Collapse>
    </div>
  );
}
