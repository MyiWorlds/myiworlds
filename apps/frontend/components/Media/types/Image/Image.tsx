import * as React from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
}

const test: CircleHydrated = {
  id: 'asdflkjsdf',
  data: {
    url: 'alskdfjalksdjf.com',
    img() {
      return <img src={this.url} />;
    },
  },
};
console.log(test);

const Image: React.FunctionComponent<Props> = ({ circle }) => {
  return <img src={circle.string} />;
};

export default Image;
