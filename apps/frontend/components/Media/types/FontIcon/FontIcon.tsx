import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
  classes?: { [key: string]: string };
}

const FontIcon: React.FunctionComponent<Props> = ({ circle, classes }) => {
  return (
    <Icon className={classes && classes.icon ? classes.icon : undefined}>
      {circle.string}
    </Icon>
  );
};

export default FontIcon;
