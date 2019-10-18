import * as React from 'react';
import Progress from '../Progress';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles } from '@material-ui/styles';

interface Props {
  classes: {
    container: string;
  };
  size?: number;
  hideMessage?: boolean;
  hideBackground?: boolean;
  message?: JSX.Element | string;
  messageVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body2'
    | 'caption'
    | 'button'
    | undefined;
  containerStylesOverride?: any;
}

const styles = () =>
  createStyles({
    container: {
      textAlign: 'center',
      display: 'block',
    },
  });

class ProgressWithMessage extends React.Component<Props> {
  constructor(props: any) {
    super(props);
    this.state = {
      zoom: true,
    };
  }
  render() {
    const {
      classes,
      size,
      hideBackground,
      message,
      messageVariant,
      hideMessage,
      containerStylesOverride,
    } = this.props;

    const progressSize = size || 42;
    const loadingMessage = message || 'Loading';
    const variant = messageVariant || 'h4';

    return (
      <div
        className={classes.container}
        style={containerStylesOverride ? containerStylesOverride : null}
      >
        <div
          style={{
            height: progressSize,
            display: 'block',
            position: 'relative',
          }}
        >
          <Progress
            hideBackground={hideBackground || false}
            size={progressSize}
          />
        </div>
        {hideMessage ? null : (
          <>
            <br />
            <div>
              <Typography variant={variant}>{loadingMessage}</Typography>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ProgressWithMessage);
