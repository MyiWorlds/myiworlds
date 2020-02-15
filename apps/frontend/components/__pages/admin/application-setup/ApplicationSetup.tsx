import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CreateProjects from './CreateProjects';
import Header from '../../../Header/Header';
import React, { useContext } from 'react';
import ServiceKeys from './service-keys/ServiceKeys';
import Spacer from './../../../Spacer/Spacer';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { UserContext } from '../../../../contexts/User/UserContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const ApplicationSetup = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Create Google Cloud Account',
      content: (
        <>
          <Typography variant="body1">
            If you do not currently have a Google Cloud Account you must first
            create one here
          </Typography>
          <Spacer />
          <Button
            component="a"
            href="https://console.cloud.google.com/freetrial"
            target="_blank"
            variant="contained"
            color="primary"
          >
            Create Account
          </Button>
          <Spacer />
        </>
      ),
    },
    {
      label: 'Create and add billing account',
      content: (
        <>
          <Typography variant="body1">
            <b>Recomended:</b> Create a new Gmail account for billing. Make sure
            to keep it secure with two-factor authentication. You could set this
            up to forward its email to your primary email, but this is a
            potential attack vector.
          </Typography>
          <Typography variant="body1">Setup billing alert</Typography>
        </>
      ),
    },
    {
      label: 'Create Application Environemnts',
      content: <CreateProjects />,
    },
    {
      label: 'Create & Save Security Credentials',
      content: <ServiceKeys />,
    },
    {
      label: 'Overview',
      content: <Typography variant="body1">You did it!</Typography>,
    },
  ];

  if (!user.isSystemAdmin) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h2">
          You must be a System Admin to access this.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Header title="Application Setup" />
      <Stepper activeStep={activeStep} orientation="vertical" nonLinear>
        {steps.map((step, index) => (
          <Step key={index} last={index === steps.length}>
            <StepButton onClick={() => setActiveStep(index)} completed={false}>
              <StepLabel>{step.label}</StepLabel>
            </StepButton>
            <StepContent>
              {step.content}
              {activeStep === index && (
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Container>
  );
};

export default ApplicationSetup;
