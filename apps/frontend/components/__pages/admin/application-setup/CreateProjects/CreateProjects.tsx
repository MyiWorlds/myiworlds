import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
import React from 'react';
import Spacer from './../../../../Spacer/Spacer';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);

const CreateProjects = () => {
  const classes = useStyles();
  const [projectName, setProjectName] = React.useState('');
  const [environments, setEnvironments] = React.useState({
    development: true,
    qa: true,
    stg: true,
    production: true,
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnvironments({ ...environments, [name]: event.target.checked });
  };

  const handleProjectNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProjectName(event.target.value);
  };

  const { development, qa, stg, production } = environments;

  return (
    <>
      <form noValidate autoComplete="off">
        <TextField
          id="organization-name"
          label="Organization Name"
          variant="outlined"
          fullWidth={true}
          helperText="If you created this through a GSuite "
        />
        <Spacer />
        <Link
          href={
            'https://cloud.google.com/resource-manager/docs/creating-managing-organization'
          }
          target="__blank"
        >
          Click here
        </Link>{' '}
        for more infomation on Organizations
        <Spacer multiplier={3} />
        <TextField
          id="project-name"
          label="Project Name *"
          variant="outlined"
          value={projectName}
          required={true}
          onChange={handleProjectNameChange}
          fullWidth={true}
          helperText="This should be the name of your Application. It cannot be changed later."
        />
        <Spacer multiplier={3} />
        <div>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Environemnts to create:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={development}
                    onChange={handleChange('development')}
                    value="development"
                  />
                }
                label="Development"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={qa}
                    onChange={handleChange('qa')}
                    value="qa"
                  />
                }
                label="Quality Assurance"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stg}
                    onChange={handleChange('stg')}
                    value="stg"
                  />
                }
                label="Staging"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={production}
                    onChange={handleChange('production')}
                    value="production"
                  />
                }
                label="Production"
              />
            </FormGroup>
          </FormControl>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('CREATE ENVIRONMENTS ON THE SERVER')}
        >
          Create Account
        </Button>
      </form>
      <Spacer multiplier={3} />
    </>
  );
};

export default CreateProjects;
