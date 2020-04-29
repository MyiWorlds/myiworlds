import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface Props {
  label?: string;
  number: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: theme.spacing(2),
    },
  }),
);

const StringViewer: React.FunctionComponent<Props> = ({ label, number }) => {
  const classes = useStyles();

  if (label) {
    return (
      <span>
        <Typography variant="caption">{label}</Typography>
        <TextField
          className={classes.textField}
          id="outlined-basic"
          label={label || ''}
          variant="outlined"
          type="number"
          value={number}
        />
      </span>
    );
  } else {
    return <Typography>{number !== '' ? '' : 'String value'}</Typography>;
  }
};

export default StringViewer;
