import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import { createStyles, withStyles } from '@material-ui/styles';

interface Props {
  classes: {
    container: string;
  };
  size: number;
  hideBackground: boolean;
  color?: 'primary' | 'secondary' | 'inherit' | undefined;
}

interface State {
  zoom: boolean;
}

const styles = () =>
  createStyles({
    container: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  });

class Progress extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      zoom: true,
    };
  }

  componentWillUnmount() {
    this.setState({
      zoom: false,
    });
  }

  render() {
    const { classes, size, hideBackground, color } = this.props;
    const { zoom } = this.state;

    const progressColor = color ? color : 'primary';

    const progressSize = size || 35;

    const progressCircle = (
      <CircularProgress
        color={progressColor}
        style={{
          position: 'absolute',
          top: progressSize / size ? 4 : 8,
          left: progressSize / size ? 4 : 8,
        }}
        // className={classes.progress}
        size={progressSize}
        thickness={5}
      />
    );

    return (
      <div className={classes.container}>
        <Zoom in={zoom}>
          {hideBackground ? (
            <div
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
              }}
            >
              {progressCircle}
            </div>
          ) : (
            <Paper
              elevation={5}
              style={{
                position: 'relative',
                height: size * 1.25 || 50,
                width: size * 1.25 || 50,
                borderRadius: '50%',
              }}
            >
              {progressCircle}
            </Paper>
          )}
        </Zoom>
      </div>
    );
  }
}

export default withStyles(styles)(Progress);
