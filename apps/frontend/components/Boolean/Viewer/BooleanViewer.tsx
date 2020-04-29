import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  label: string;
  boolean: boolean;
  isInList?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemSwitch: {
      marginRight: 0,
      marginLeft: '-13px',
    },
    switch: {
      margin: theme.spacing(2),
    },
  }),
);

const BooleanViewer: React.FunctionComponent<Props> = ({
  label,
  boolean,
  isInList,
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Switch
          disabled={true}
          className={isInList ? classes.listItemSwitch : classes.switch}
          edge="start"
          checked={boolean}
          inputProps={{
            'aria-labelledby': 'switch-list-label-dark-theme',
          }}
        />
      }
      label={label}
    />
  );
};

export default BooleanViewer;
