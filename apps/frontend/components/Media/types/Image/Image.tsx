import * as React from 'react';
import { CircleHydrated } from '@myiworlds/types';

interface Props {
  circle: CircleHydrated;
  classes?: { [key: string]: string };
}

// const test: CircleHydrated = {
//   id: 'asdflkjsdf',
//   data: {
//     url: 'alskdfjalksdjf.com',
//     img() {
//       return <img src={this.url} />;
//     },
//   },
// };
// console.log(test);

const Image: React.FunctionComponent<Props> = ({ circle, classes }) => {
  console.log('Classes need to be added to images after made up');
  return <img src={circle.string} alt={circle.title} />;
};

export default Image;
