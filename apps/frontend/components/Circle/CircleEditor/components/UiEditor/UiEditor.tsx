import CircleFieldEditorBasic from '../CircleFieldEditorBasic/CircleFieldEditorBasic';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaletteIcon from '@material-ui/icons/Palette';
import React from 'react';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import StylesEditor from './StylesEditor/StylesEditor';
import { Circle } from '@myiworlds/types';
import { CircleFactory } from '@myiworlds/factories';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { ListItem, ListItemText } from '@material-ui/core';
import { ProfileContext } from './../../../../../contexts/Profile/ProfileContext';
import { setDeep } from '@myiworlds/helper-functions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

interface Props {
  uiCircle: Circle;
  uiValues: Circle | null;
  setCircleUi: (newValue: Circle) => void;
}

export default function UiEditor({ uiCircle, uiValues, setCircleUi }: Props) {
  const classes = useStyles();
  const { selectedProfile } = React.useContext(ProfileContext);
  const [showStyles, setShowStyles] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

  const handleClickOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleClickStyles = () => {
    setShowStyles(!showStyles);
  };

  // Setdeep needs array of path strings not string
  // need to update the nested field, maybe just take last item in array for property
  const handleUpdateUi = (path: string[], newValue: Circle) => {
    // format needed
    // const cirlce = {
    //   data: {
    //     options: {
    //       showLabel: true,
    //       variant: 'h3',
    //     }, styles: {
    //       styles: {
    //         label: {
    //           fontColor: 'red',
    //         },
    //         string: {
    //           fontColor: 'red',
    //           fontSize: '43rem',
    //     }
    //   }
    // }
    let circleToUpdate = null;
    if (!uiValues) {
      const newUiCircle = new CircleFactory().use('UI').create({
        selectedProfileId: selectedProfile.id,
        header: {
          id: '',
          collection: FIRESTORE_COLLECTIONS.CIRCLES,
        },
        data: {},
      });
      const propertyEditing = path.pop();
      if (propertyEditing) {
        setDeep(newUiCircle, ['data', ...path], propertyEditing, newValue);
      }
      circleToUpdate = newUiCircle;
    } else {
      circleToUpdate = uiValues;
    }
    setCircleUi(circleToUpdate);
  };

  return (
    <>
      <ListItem button onClick={handleClickOptions}>
        <ListItemIcon>
          <SettingsApplicationsIcon />
        </ListItemIcon>
        <ListItemText primary="Field Options" />
        {showOptions ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={showOptions} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {Object.keys(uiCircle.data.options).map((uiField: string) => {
            return (
              <ListItem
                className={classes.nested}
                key={`${uiCircle.data.options[uiField].id}`}
              >
                <CircleFieldEditorBasic
                  circle={uiCircle.data.options[uiField]}
                  handleUpdate={handleUpdateUi}
                  path={['options', uiField]}
                />
              </ListItem>
            );
          })}
        </List>
      </Collapse>

      <ListItem button onClick={handleClickStyles}>
        <ListItemIcon>
          <PaletteIcon />
        </ListItemIcon>
        <ListItemText primary="Styles" />
        {showStyles ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={showStyles} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <StylesEditor
            styles={uiCircle.data.styles}
            handleUpdate={handleUpdateUi}
          />
        </List>
      </Collapse>
    </>
  );
}
