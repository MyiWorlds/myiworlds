import cloneDeep from 'lodash.clonedeep';
import ObjectEditor from '../../Object/Editor/ObjectEditor';
import React, { useContext } from 'react';
import { Circle } from '@myiworlds/types';
import { deepMerge } from '@myiworlds/helper-functions';
import { UserContext } from '../../../contexts/User/UserContext';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    card: {
      maxWidth: 400,
      margin: '0px auto',
      overflow: 'visible',
    },
    secondaryAction: {
      zIndex: 999,
    },
    list: {
      overflow: 'auto',
      paddingBottom: theme.spacing(8),
    },
    listItemSwitch: {
      marginRight: 0,
      marginLeft: '-13px',
    },
  }),
);

interface Props {
  circle: Circle;
  updateCircle: (newValues: any) => void;
}

const ThemeEditor: React.FC<Props> = ({ circle, updateCircle }) => {
  const classes = useStyles();
  const muiTheme = useTheme();
  const { user } = useContext(UserContext);

  const theme = circle.data.theme;
  const currentThemeColor =
    theme && theme.palette && theme.palette.type ? theme.palette.type : 'dark';

  const darkTheme = currentThemeColor === 'dark';

  const handleToggleDarkTheme = () => {
    const test = {
      ...circle,
      data: {
        theme: {
          ...circle.data.theme,
          palette: {
            ...circle.data.theme.palette,
            type: theme.palette.type === 'dark' ? 'light' : 'dark',
          },
        },
      },
    };
    updateCircle(test);
  };

  const handleUpdateCircle = (newValue: any) => {
    const updatedCircle = cloneDeep(circle);

    updatedCircle.data.theme = {
      ...updatedCircle.data.theme,
      ...newValue,
    };

    updateCircle(updatedCircle);
  };

  let combinedTheme = cloneDeep(circle.data.theme);

  if (user.isSystemAdmin) {
    combinedTheme = deepMerge(
      cloneDeep(circle.data.theme),
      cloneDeep(muiTheme),
    );
  }

  const listOfFieldPathsNotEditable = [
    'spacing',
    'breakpoints.between',
    'breakpoints.down',
    'breakpoints.only',
    'breakpoints.up',
    'breakpoints.width',
    'mixins.gutters',
    'palette.type',
    'palette.primary.dark',
    'palette.primary.light',
    'palette.primary.contrastText',
    'palette.secondary.dark',
    'palette.secondary.light',
    'palette.secondary.contrastText',
    'palette.success.dark',
    'palette.success.light',
    'palette.success.contrastText',
    'palette.error.dark',
    'palette.error.light',
    'palette.error.contrastText',
    'palette.warning.dark',
    'palette.warning.light',
    'palette.warning.contrastText',
    'palette.info.dark',
    'palette.info.light',
    'palette.info.contrastText',
    'palette.getContrastText',
    'palette.augmentColor',
    'transitions.create',
    'transitions.getAutoHeightDuration',
    'typography.pxToRem',
    'typography.round',
  ];

  const deleteKey = (obj: any, path: string) => {
    try {
      if (!obj) {
        return;
      }

      const pathArray = path.split('.');

      for (let i = 0; i < pathArray.length - 1; i++) {
        obj = obj[pathArray[i]];

        if (typeof obj === 'undefined') {
          return;
        }
      }

      if (pathArray.length > 1) {
        delete obj[(pathArray as any).pop()];
      } else {
        delete obj[pathArray[0]];
      }
    } catch (error) {
      console.log(error);
    }
  };

  listOfFieldPathsNotEditable.forEach(field => deleteKey(combinedTheme, field));

  return (
    <List className={classes.list}>
      <ListItem>
        <ListItemIcon>
          <Switch
            className={classes.listItemSwitch}
            edge="end"
            onChange={handleToggleDarkTheme}
            checked={darkTheme}
            inputProps={{
              'aria-labelledby': 'switch-list-label-dark-theme',
            }}
          />
        </ListItemIcon>
        <ListItemText id="switch-list-label-dark-theme" primary="Dark Theme" />
      </ListItem>
      <ObjectEditor
        object={combinedTheme}
        originalObject={circle.data.theme}
        updateCircle={handleUpdateCircle}
      />
    </List>
  );
};

export default ThemeEditor;
