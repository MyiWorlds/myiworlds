import Button from '@material-ui/core/Button';
import Buttons from './Buttons';
import Checkboxes from './Checkboxes';
import Grid from '@material-ui/core/Grid';
import MaterialUiTheme from '../MaterialUiTheme';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Selects from './Selects';
import Sliders from './Sliders';
import Spacer from '../../Spacer';
import Switches from './Switches';
import TextFields from './TextFields';
import { Circle } from '@myiworlds/types';
import {
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  useTheme,
  Card,
} from '@material-ui/core';

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
      maxWidth: '80%',
      margin: '0px auto',
      overflow: 'auto',
    },
    secondaryAction: {
      zIndex: 999,
    },
  }),
);

interface Props {
  circle: Circle;
  setCanSave?: (bool: boolean) => void;
}

const ThemeViewer: React.FunctionComponent<Props> = ({ circle, setCanSave }) => {
  const muiTheme = useTheme();
  const classes = useStyles();

  const theme = circle.data.theme;

  return (
    <MaterialUiTheme themeOverride={theme} setCanSave={setCanSave}>
      <div style={{ background: theme.palette.background?.default || muiTheme.palette.background.default }}>
        <Spacer multiplier={3} />
        <Card className={classes.card}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Example of theme
                </Typography>
              <Button color="inherit">Button</Button>
            </Toolbar>
          </AppBar>
          <CardContent>


            <Grid container spacing={3}>
              <Grid item md={6}>
                <Spacer />
                <Buttons />
              </Grid>
              <Grid item md={6}>
                <Spacer multiplier={3} />
                <Typography variant="h6">Text Fields:</Typography>
                <TextFields />
              </Grid>
            </Grid>

            <Spacer multiplier={3} />
            <Typography variant="h6">Typography:</Typography>

            <Typography variant="h1">Typography h1</Typography>
            <Spacer />
            <Typography variant="h2">Typography h2</Typography>
            <Spacer />
            <Typography variant="h3">Typography h3</Typography>
            <Spacer />
            <Typography variant="h4">Typography h4</Typography>
            <Spacer />
            <Typography variant="h5">Typography h5</Typography>
            <Spacer />
            <Typography variant="h6">Typography h6</Typography>
            <Spacer />
            <Typography variant="caption">Caption</Typography>
            <Spacer />
            <Typography variant="body1">Body1</Typography>
            <Spacer />
            <Typography variant="body2">Body2</Typography>


            <Spacer multiplier={3} />

            <Typography variant="h6">Switches:</Typography>
            <Switches />

            <Spacer multiplier={3} />


            <Typography variant="h6">Checkboxes:</Typography>
            <Checkboxes />

            <Spacer multiplier={3} />

            <Typography variant="h6">Switches:</Typography>
            <Selects />

            <Spacer multiplier={3} />

            <Typography variant="h6">Sliders:</Typography>
            <Sliders />
          </CardContent>
        </Card>

        <Spacer multiplier={3} />

      </div>
    </MaterialUiTheme>
  );
};

export default ThemeViewer;
