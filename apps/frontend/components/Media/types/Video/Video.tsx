import * as React from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
}

const Video: React.FunctionComponent<Props> = ({ circle }) => {
  return <video src={circle.string} />;
};

export default Video;
