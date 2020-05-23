import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/styles';

interface Props {
  size?: number;
  hideBackground?: boolean;
  color?: 'primary' | 'secondary' | 'inherit' | undefined;
}

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const Progress: React.FC<Props> = ({ size, hideBackground, color }) => {
  const [zoom, setZoom] = useState(true);
  const classes = useStyles({});
  const progressColor = color ? color : 'primary';
  const progressSize = size || 35;

  useEffect(() => {
    return () => setZoom(false);
  }, []);

  const progressCircle = (
    <CircularProgress
      color={progressColor}
      style={{
        position: 'absolute',
        top: progressSize / progressSize ? 5 : 8,
        left: progressSize / progressSize ? 5 : 8,
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
              height: progressSize * 1.25 || 50,
              width: progressSize * 1.25 || 50,
            }}
          >
            {progressCircle}
          </div>
        ) : (
          <Paper
            elevation={5}
            style={{
              position: 'relative',
              height: progressSize * 1.25 || 50,
              width: progressSize * 1.25 || 50,
              borderRadius: '50%',
            }}
          >
            {progressCircle}
          </Paper>
        )}
      </Zoom>
    </div>
  );
};

export default Progress;
