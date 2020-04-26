import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  property: string;
  value: number;
  setValue: (newValue: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(2),
    },
  }),
);

const NumberEditor: React.FunctionComponent<Props> = ({
  property,
  value,
  setValue,
}) => {
  const classes = useStyles();

  const handleNumberChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <TextField
      className={classes.textField}
      id="outlined-basic"
      label={property || ''}
      variant="outlined"
      type="number"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleNumberChange(Number(e.target.value))
      }
    />
  );
};

export default NumberEditor;
