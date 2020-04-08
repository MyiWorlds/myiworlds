import { CircleCloneDoesNotExist } from './circlesClones/circleCloneDoesNotExist';
import { CircleClonePermssionDenied } from './circlesClones/circleClonePermissionDenied';
import { PossibleCircleTypes } from '@myiworlds/types';

export class CircleClonesFactory {
  use(type: 'PERMISSION_DENIED'): CircleClonePermssionDenied;
  use(type: 'DOES_NOT_EXIST'): CircleCloneDoesNotExist;

  public use(type: PossibleCircleTypes) {
    switch (type) {
      case 'PERMISSION_DENIED':
        return new CircleClonePermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new CircleCloneDoesNotExist();
    }
  }
}
