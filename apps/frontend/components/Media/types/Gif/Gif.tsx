import * as React from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
}

const Gif: React.FunctionComponent<Props> = ({ circle }) => {
  return <img src={circle.string} alt={circle.title} />;
};

export default Gif;
