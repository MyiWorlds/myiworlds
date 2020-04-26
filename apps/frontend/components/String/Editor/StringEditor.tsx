import ColorListItem from './ColorListItem';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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

  const handleStringChange = (newValue: string) => {
    setValue(newValue);
  };

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
};

export default StringEditor;
