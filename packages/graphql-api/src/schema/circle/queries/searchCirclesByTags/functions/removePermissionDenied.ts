import { SearchCircle } from '@myiworlds/types';

const removePermissionDenied = (circles: SearchCircle[]) => {
  return circles.filter(circle => circle.type !== 'PERMISSION_DENIED');
};

export default removePermissionDenied;
