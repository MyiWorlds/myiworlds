import { SearchCircle } from '@myiworlds/types';

const hasFetchedEnough = (circle: SearchCircle, numberOfResults: number) => {
  return circle.lines.length < numberOfResults && circle.data.cursor;
};

export default hasFetchedEnough;
