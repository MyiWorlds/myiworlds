import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
}

const FontIcon: React.FunctionComponent<Props> = ({ circle }) => {
  return <Icon>{circle.string}</Icon>;
};

export default FontIcon;
