import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Layout } from 'react-grid-layout';

interface Props {
  isLayoutItemShown: boolean;
  removeFieldToLayouts: () => void;
  addFieldToLayouts: () => void;
  toggleStatic: () => void;
  currentLayoutEditing: Layout;
}

export default function LayoutEditor({
  isLayoutItemShown,
  removeFieldToLayouts,
  addFieldToLayouts,
  toggleStatic,
  currentLayoutEditing,
}: Props) {
  return (
    <div>
      <ListItem>
        <ListItemIcon>
          {isLayoutItemShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary="Show" />

        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={
              isLayoutItemShown ? removeFieldToLayouts : addFieldToLayouts
            }
            checked={isLayoutItemShown}
            inputProps={{ 'aria-labelledby': 'switch-show-grid-item' }}
          />
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem>
        <ListItemIcon>
          {currentLayoutEditing.static ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon>
        <ListItemText primary="Static" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={toggleStatic}
            checked={currentLayoutEditing.static}
            inputProps={{ 'aria-labelledby': 'switch-show-grid-item' }}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
