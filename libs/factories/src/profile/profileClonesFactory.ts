import { ProfileCloneDoesNotExist } from './profilesClones/profileCloneDoesNotExist';
import { ProfileClonePermssionDenied } from './profilesClones/profileClonePermissionDenied';

type PossibleProfileTypes = 'DOES_NOT_EXIST' | 'PERMISSION_DENIED';

export class ProfileClonesFactory {
  use(type: 'PERMISSION_DENIED'): ProfileClonePermssionDenied;
  use(type: 'DOES_NOT_EXIST'): ProfileCloneDoesNotExist;

  public use(type: PossibleProfileTypes) {
    switch (type) {
      case 'PERMISSION_DENIED':
        return new ProfileClonePermssionDenied();

      case 'DOES_NOT_EXIST':
      default:
        return new ProfileCloneDoesNotExist();
    }
  }
}
