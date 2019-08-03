import removeDoesNotExist from './removeDoesNotExist';
import removePermissionDenied from './removePermissionDenied';
import { SearchCircle } from '@myiworlds/types';

const removeAllInvalid = (unfiltered: SearchCircle[]) => {
  let filtered: SearchCircle[] = [];
  filtered = removeDoesNotExist(unfiltered);
  filtered = removePermissionDenied(filtered);

  return filtered;
};

export default removeAllInvalid;
