import Progress from '../Progress';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

interface Props {
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
  containerStylesOverride?: React.CSSProperties;
}

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  loadingMessage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const ProgressWithMessage: React.FC<Props> = ({
  size,
  hideBackground,
  message,
  messageVariant,
  hideMessage,
  containerStylesOverride,
}) => {
  const classes = useStyles({});

  const progressSize = size || 42;
  const loadingMessage = message || 'Loading';
  const variant = messageVariant || 'h6';

  return (
    <div
      className={classes.container}
      style={containerStylesOverride ? containerStylesOverride : {}}
    >
      <div className={classes.loadingMessage}>
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
    </div>
  );
};

export default ProgressWithMessage;
