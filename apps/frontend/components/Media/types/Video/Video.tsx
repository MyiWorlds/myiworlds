import * as React from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
  classes?: { [key: string]: string };
}

const Video: React.FunctionComponent<Props> = ({ circle, classes }) => {
  console.log('Video Classes need to be hooked up after adding video');
  return <video src={circle.string} />;
};

export default Video;
