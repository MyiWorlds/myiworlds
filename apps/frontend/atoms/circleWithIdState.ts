import { Circle } from '@myiworlds/types';
import {
  atom,
  // useRecoilValue
} from 'recoil';

const circleWithIdState = (id: string) =>
  // React.memo(
  atom<Circle>({
    key: id,
    default: {
      id: id,
      title: 'title',
    },
  }) as any;
// ) as any;
export default circleWithIdState;
