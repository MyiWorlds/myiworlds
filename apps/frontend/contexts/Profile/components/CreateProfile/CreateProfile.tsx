import Progress from '../../../../components/Progress';
import React, { useContext } from 'react';
import Spacer from '../../../../components/Spacer';
import { ProfileContext } from '../../ProfileContext';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Icon,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  usernameTextField: {
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  textfieldProgress: {
    position: 'relative',
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: 4,
    marginLeft: 6,
  },
  infoPaper: {
    padding: theme.spacing(2),
    margin: `0px ${theme.spacing(1)}px`,
  },
  codeBlock: {
    background: theme.palette.background.default,
    padding: theme.spacing(1),
    margin: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  restrictionsList: {
    color: theme.palette.text.primary,
  },
  savingProfileContainer: {
    margin: theme.spacing(4),
  },
  actions: {
    display: 'flex',
  },
}));

interface Props {
  onCancel?: () => void;
}

const CreateProfile: React.FC<Props> = ({ onCancel = () => {} }) => {
  const {
    usernameToCreate,
    setUsernameToCreate,
    createProfile,
    createProfileLoading,
    usernameAvailable,
    handleCancelCreateProfile,
    usernameInvalid,
    getProfileByUsernameLoading,
    searchTimeoutActive,
    creatingNew,
  } = useContext(ProfileContext);

  const classes = useStyles();

  const progress = (
    <div className={classes.textfieldProgress}>
      <Progress hideBackground size={24} />
    </div>
  );

  const userIcon = (
    <Icon
      style={{
        color: usernameInvalid ? 'red' : 'green',
      }}
    >
      account_circle
    </Icon>
  );

  let usernameMessage: null | string = null;
  let textfieldIcon: null | any = null;

  if (getProfileByUsernameLoading || searchTimeoutActive) {
    usernameMessage = 'Checking if available...';
    textfieldIcon = progress;
  } else if (usernameAvailable) {
    usernameMessage = 'Yes! This username is available!';
    textfieldIcon = userIcon;
  } else {
    usernameMessage = 'Try to create a unique username';
    textfieldIcon = userIcon;
  }

  return (
    <div>
      <Typography variant="body1" color="textPrimary">
        {creatingNew
          ? 'Choose your username, but think hard as you should avoid changing it at all costs!'
          : 'This will change all your previous URLs you may have posted around the internet. All your old URLs will have your new username infront.'}
      </Typography>
      <Spacer />

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<Icon>expand_more</Icon>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Icon style={{ marginRight: 8 }}>help</Icon>
          <Typography>Why</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Typography>
              If you create custom URL's using your username and give them out,
              for example:
            </Typography>

            <Paper className={classes.codeBlock}>
              <Typography>
                {window.location.protocol}//
                {window.location.hostname}/<b>my-username</b>
                /something-you-created
              </Typography>
            </Paper>

            <Typography>
              then change your username to "my-new-username", it will break all
              the old links because your new one would look like:
            </Typography>

            <Paper className={classes.codeBlock}>
              <Typography>
                {window.location.protocol}//
                {window.location.hostname}/<b>my-new-username</b>
                /something-you-created
              </Typography>
            </Paper>

            <Typography>
              If you only share using direct URL's you will be fine (seen
              below), but this makes your URL's hard for people to memorize
            </Typography>

            <Paper className={classes.codeBlock}>
              <Typography>
                {window.location.protocol}//
                {window.location.hostname}/id/Faj8131kjvERa
              </Typography>
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<Icon>expand_more</Icon>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Icon style={{ marginRight: 8 }}>warning</Icon>
          <Typography>Username Requirements</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Paper className={classes.infoPaper}>
              <Typography variant="body1">
                A valid username must follow the following guidelines:
              </Typography>
              <ul className={classes.restrictionsList}>
                <li>
                  <Typography variant="body1">
                    Must not be in use by anyone else
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Must be 4 or more characters
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Can only contain characters A-Z, 0-9, -, or _
                  </Typography>
                </li>
              </ul>
            </Paper>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <Spacer />

      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        value={usernameToCreate}
        fullWidth
        className={classes.usernameTextField}
        onChange={(event: any) => setUsernameToCreate(event.target.value)}
        error={usernameInvalid}
        helperText={usernameMessage}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{textfieldIcon}</InputAdornment>
          ),
        }}
      />

      <div className={classes.actions}>
        <div style={{ flexGrow: 1 }} />
        <Button
          onClick={() => {
            handleCancelCreateProfile();
            onCancel();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          disabled={
            createProfileLoading || !usernameAvailable || usernameInvalid
          }
          variant="contained"
          color="primary"
          onClick={() => createProfile()}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateProfile;
