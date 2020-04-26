import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import Switch from '@material-ui/core/Switch';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  property: string;
  value: boolean;
  setValue: (newValue: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemSwitch: {
      marginRight: 0,
      marginLeft: '-13px',
    },
  }),
);

const BooleanEditor: React.FunctionComponent<Props> = ({
  property,
  value,
  setValue,
}) => {
  const classes = useStyles();

  const handleBooleanChange = () => {
    setValue(!value);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          className={classes.listItemSwitch}
          edge="end"
          onChange={handleBooleanChange}
          checked={value}
          inputProps={{
            'aria-labelledby': 'switch-list-label-dark-theme',
          }}
        />
      }
      label={property}
    />
  );
};

export default BooleanEditor;
