import CircleFieldEditorBasic from './../../CircleFieldEditorBasic/CircleFieldEditorBasic';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaletteIcon from '@material-ui/icons/Palette';
import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { makeCamelCaseHumanReadable } from '@myiworlds/helper-functions';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import PaletteIcon from '@material-ui/icons/Palette';
// import Select from '@material-ui/core/Select';

import {
  ListItem,
  // ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

interface StyleEditorProps {
  property: string;
  value: any;
  handleUpdate: (path: string[], newValues: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export default function StyleEditor({
  property,
  value,
  handleUpdate,
}: StyleEditorProps) {
  const [showStyles, setShowStyles] = React.useState(false);
  const classes = useStyles();
  const handleClickStyles = () => {
    setShowStyles(!showStyles);
  };

  const propertyName = makeCamelCaseHumanReadable(property);

  return (
    <>
      <ListItem button onClick={handleClickStyles} className={classes.nested}>
        <ListItemIcon>
          <PaletteIcon />
        </ListItemIcon>
        <ListItemText primary={propertyName} />
        {showStyles ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={showStyles} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(value).map((style: string) => {
            if (!value[style]) {
              return null;
            }
            return (
              <CircleFieldEditorBasic
                key={value[style].id}
                circle={value[style]}
                path={['styles', style]}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
