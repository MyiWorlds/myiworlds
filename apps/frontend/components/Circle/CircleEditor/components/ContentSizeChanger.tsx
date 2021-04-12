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

const useStyles = makeStyles((theme) => ({
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

  const componentDidMount = () => {
    if (!displaySize) {
      setDisplaySize(theme.breakpoints.values.lg + 1);
    }
  };

  React.useEffect(componentDidMount, []);

  const handleScreenSize = (
    event: React.MouseEvent<HTMLElement>,
    newScreenSize: number | null | '',
  ) => {
    if (newScreenSize === '') {
      newScreenSize = null;
    }
    setDisplaySize(newScreenSize as number | null);
  };

  let switchActivated: '' | number = '';

  if (displaySize) {
    const closest = Object.values(theme.breakpoints.values).reduce(
      (a: number, b: number) => {
        return Math.abs(b - displaySize) < Math.abs(a - displaySize) ? b : a;
      },
    );

    switchActivated =
      closest < theme.breakpoints.values['sm'] ? 300 : closest + 1;
  } else {
    if (editingGrid) {
      switchActivated = theme.breakpoints.values.xl + 1;
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
        <ToggleButton value={300} aria-label="extra small">
          xs
        </ToggleButton>
        <ToggleButton
          value={theme.breakpoints.values.sm + 1}
          aria-label="small"
        >
          sm
        </ToggleButton>
        <ToggleButton
          value={theme.breakpoints.values.md + 1}
          aria-label="medium"
        >
          md
        </ToggleButton>
        <ToggleButton
          value={theme.breakpoints.values.lg + 1}
          aria-label="large"
        >
          lg
        </ToggleButton>
        <ToggleButton
          value={theme.breakpoints.values.xl + 1}
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
