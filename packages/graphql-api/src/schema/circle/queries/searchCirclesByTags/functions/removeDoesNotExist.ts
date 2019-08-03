import { SearchCircle } from '@myiworlds/types';

const removeDoesNotExist = (circles: SearchCircle[]) => {
  return circles.filter(circle => circle.type !== 'DOES_NOT_EXIST');
};

export default removeDoesNotExist;
