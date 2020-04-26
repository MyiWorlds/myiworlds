import Button from '@material-ui/core/Button';
import MaterialUiTheme from '../MaterialUiTheme';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import Spacer from '../../Spacer';
import TextField from '@material-ui/core/TextField';
import { Circle } from '@myiworlds/types';
import {
  CardContent,
  CardActions,
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
      maxWidth: 400,
      margin: '0px auto',
      overflow: 'visible',
    },
    secondaryAction: {
      zIndex: 999,
    },
  }),
);

interface Props {
  circle: Circle;
}

const ThemeViewer: React.FunctionComponent<Props> = ({ circle }) => {
  const muiTheme = useTheme();
  const classes = useStyles();
  const theme = circle.data.theme;

  return (
    <MaterialUiTheme themeOverride={theme}>
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
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
          <CardContent>
            <Spacer />
            <Typography variant="h6">Primary Buttons:</Typography>
            <CardActions>
              <Button variant="contained" color="primary">
                contained
                </Button>
              <Button color="primary">Flat</Button>
              <Button variant="outlined" color="primary">
                outlined
                </Button>
            </CardActions>
            <Spacer />
            <Typography variant="h6">Secondary Buttons:</Typography>
            <CardActions>
              <Button variant="contained" color="secondary">
                contained
                </Button>
              <Button color="secondary">Flat</Button>
              <Button variant="outlined" color="secondary">
                outlined
                </Button>
            </CardActions>
            <Spacer />
            <Typography variant="h6">Default Buttons:</Typography>
            <CardActions>
              <Button variant="contained" color="default">
                contained
                </Button>
              <Button color="default">Flat</Button>
              <Button variant="outlined" color="default">
                outlined
                </Button>
            </CardActions>
            <Spacer multiplier={3} />
            <Typography variant="h6">Text Fields:</Typography>
            <form noValidate autoComplete="off">
              <TextField id="standard-basic" label="Standard" />
              <Spacer />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <Spacer />
              <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            </form>
          </CardContent>
        </Card>
        <Spacer multiplier={3} />
      </div>
    </MaterialUiTheme>
  )
}

export default ThemeViewer;
