import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import SearchTextField from '../../../contexts/UserInterface/AppController/SearchTextField';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { UserInterfaceContext } from '../../../contexts/UserInterface/UserInterfaceContext';

// Move out to central circles file
const circle = {
  title: 'Create',
  // type: CIRCLE_TYPES.LINES,
  lines: [
    {
      media: 'history',
      title: 'History',
      // type: CIRCLE_TYPES.LINES,
      lines: [
        {
          // type: CIRCLE_TYPES.STRING
          media: 'description',
          title: 'Text',
        },
        {
          media: 'image',
          title: 'Image',
        },
        {
          media: 'format_list_bulleted',
          title: 'List',
        },
        {
          media: 'videocam',
          title: 'Video',
        },
        {
          media: 'description',
          title: 'Page',
        },
        {
          media: 'build',
          title: 'Custom',
        },
      ],
    },
    {
      media: 'label_important',
      title: 'Defaults',
      // type: CIRCLE_TYPES.LINES,
      lines: [
        {
          // type: CIRCLE_TYPES.STRING
          media: 'description',
          title: 'Text',
        },
        {
          media: 'image',
          title: 'Image',
        },
        {
          media: 'format_list_bulleted',
          title: 'List',
        },
        {
          media: 'videocam',
          title: 'Video',
        },
        {
          media: 'description',
          title: 'Page',
        },
        {
          media: 'build',
          title: 'Custom',
        },
      ],
    },
    {
      media: 'whatshot',
      title: 'Popular',
      // type: CIRCLE_TYPES.EDGE,
      // query: if has more then current value of uses (on circle.metadata, uses: number)
      lines: [
        {
          // type: CIRCLE_TYPES.STRING
          // media: img url of it,
          media: 'help',
          title: 'Material UI custom Gallery',
        },
      ],
    },
  ],
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    root: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    cardActionsArea: {
      textAlign: 'center',
    },
    media: {
      margin: theme.spacing(2),
      height: 64,
      fontSize: 64,
    },
    sectionMedia: {
      fontSize: 32,
      marginTop: 3,
    },
  }),
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  },
);

export default function CircleSelector() {
  const classes = useStyles();
  const { creatingCircle, setCreatingCircle } = useContext(
    UserInterfaceContext,
  );

  const handleClose = () => {
    setCreatingCircle(false);
  };

  return (
    <Dialog
      fullScreen
      open={creatingCircle}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Select Content Type to create
          </Typography>
        </Toolbar>
      </AppBar>

      <SearchTextField />

      <div className={classes.root}>
        <Grid container spacing={3}>
          {circle.lines.map(creationType => {
            return [
              <Grid item sm={12} key={creationType.title}>
                <CardHeader
                  avatar={
                    <Icon className={classes.sectionMedia}>
                      {creationType.media}
                    </Icon>
                  }
                  title={creationType.title}
                />
              </Grid>,
              creationType.lines
                ? creationType.lines.map(type => (
                    <Grid item xs={6} sm={3} lg={2} key={type.title}>
                      <Card>
                        <CardActionArea className={classes.cardActionsArea}>
                          <Icon className={classes.media}>{type.media}</Icon>
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              {type.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : null,
            ];
          })}
        </Grid>
      </div>
    </Dialog>
  );
}
