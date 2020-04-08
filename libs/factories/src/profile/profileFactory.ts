import { ProfileDoesNotExist } from './profiles/profileDoesNotExist';
import { ProfileGuest } from './profiles/profileGuest';
import { ProfilePermssionDenied } from './profiles/profilePermissionDenied';
import { UserProfile } from './profiles/userProfile';

type PossibleProfileTypes =
  | 'PROFILE'
  | 'DOES_NOT_EXIST'
  | 'PERMISSION_DENIED'
  | 'UPDATED'
  | 'CREATED'
  | 'VIEWED'
  | 'GUEST';

export class ProfileFactory {
  use(type: 'PROFILE'): UserProfile;
  use(type: 'GUEST'): ProfileGuest;
  use(type: 'PERMISSION_DENIED'): ProfilePermssionDenied;
  use(type: 'DOES_NOT_EXIST'): ProfileDoesNotExist;

  public use(type: PossibleProfileTypes) {
    switch (type) {
      // case 'UPDATED':
      // case 'CREATED':
      // case 'VIEWED':
      //   return new ProfileLine();

      case 'PROFILE':
        return new UserProfile();

      case 'GUEST':
        return new ProfileGuest();

      case 'PERMISSION_DENIED':
        return new ProfilePermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new ProfileDoesNotExist();
    }
  }
}
