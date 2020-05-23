import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

const CreateSecurityKey: React.FunctionComponent = () => {
  const classes = useStyles();
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title="Create Security Key"
        subheader="This should only be used to create keys for when you create a environment"
      />
      <CardContent>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Secret Name"
            value={name}
            variant="outlined"
            onChange={handleNameChange}
          />
          <FormHelperText id="component-helper-text">
            Numeric numbers 0-## or latest for newest one
          </FormHelperText>
          <Typography variant="caption">
            Create Security Key and then save it to Google Cloud Security
            Manager
          </Typography>
          <Typography variant="body2">
            It will then be used in this build environment
          </Typography>
          <CardActions>
            <Button variant="contained" color="primary" onClick={() => {}}>
              Create
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSecurityKey;
