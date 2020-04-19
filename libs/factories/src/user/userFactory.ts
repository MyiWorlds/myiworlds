import { UserDoesNotExist } from './users/userDoesNotExist';
import { UserGuest } from './users/userGuest';
import { UserPermssionDenied } from './users/userPermissionDenied';

type PossibleUserTypes = 'GUEST' | 'DOES_NOT_EXIST' | 'PERMISSION_DENIED';

export class UserFactory {
  use(type: 'PERMISSION_DENIED'): UserPermssionDenied;
  use(type: 'DOES_NOT_EXIST'): UserDoesNotExist;

  public use(type: PossibleUserTypes) {
    switch (type) {
      case 'GUEST':
        return new UserGuest();

      case 'PERMISSION_DENIED':
        return new UserPermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new UserDoesNotExist();
    }
  }
}
