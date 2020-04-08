import { UserCloneDoesNotExist } from './usersClones/userCloneDoesNotExist';
import { UserClonePermssionDenied } from './usersClones/userClonePermissionDenied';

type PossibleUserCloneTypes = 'DOES_NOT_EXIST' | 'PERMISSION_DENIED';

export class UserClonesFactory {
  use(type: 'PERMISSION_DENIED'): UserClonePermssionDenied;
  use(type: 'DOES_NOT_EXIST'): UserCloneDoesNotExist;

  public use(type: PossibleUserCloneTypes) {
    switch (type) {
      case 'PERMISSION_DENIED':
        return new UserClonePermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new UserCloneDoesNotExist();
    }
  }
}
