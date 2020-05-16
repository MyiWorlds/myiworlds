import HeightIcon from '@material-ui/icons/Height';
import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, useTheme } from '@material-ui/core/styles';

interface Props {
  displaySize: number | null;
  setDisplaySize: (newSize: number | null) => void;
  editingGrid?: boolean;
}

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 2, 2, 0),
  },
  responsiveIcon: {
    transform: 'rotate(90deg)',
  },
}));

export default function ContentSizeChanger({
  displaySize,
  setDisplaySize,
  editingGrid,
}: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const handleScreenSize = (
    event: React.MouseEvent<HTMLElement>,
    newScreenSize: number | null | '',
  ) => {
    if (newScreenSize === '') {
      newScreenSize = null;
    }
    setDisplaySize(newScreenSize);
  };

  let switchActivated: '' | number = '';

  if (displaySize) {
    switchActivated = displaySize;
  } else {
    if (editingGrid) {
      switchActivated = theme.breakpoints.values.xl;
    } else {
      switchActivated = '';
    }
  }

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={switchActivated}
        exclusive
        onChange={handleScreenSize}
        aria-label="screen size"
        size="small"
      >
        <ToggleButton value={250} aria-label="extra small">
          xs
        </ToggleButton>
        <ToggleButton value={theme.breakpoints.values.sm} aria-label="small">
          sm
        </ToggleButton>
        <ToggleButton value={theme.breakpoints.values.md} aria-label="medium">
          md
        </ToggleButton>
        <ToggleButton value={theme.breakpoints.values.lg} aria-label="large">
          lg
        </ToggleButton>
        <ToggleButton
          value={theme.breakpoints.values.xl}
          aria-label="extra large"
        >
          xl
        </ToggleButton>
        {!editingGrid && (
          <ToggleButton value={''} aria-label="responsive">
            <Tooltip title="Responsive">
              <HeightIcon className={classes.responsiveIcon} />
            </Tooltip>
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </div>
  );
}
