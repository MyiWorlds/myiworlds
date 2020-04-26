import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { Circle } from '@myiworlds/types';

interface Props {
  circle: Circle;
}

const StringViewer: React.FunctionComponent<Props> = ({ circle }) => {
  return <Typography>{circle.string !== '' ? '' : 'String value'}</Typography>;
};

export default StringViewer;
