import { CircleClonesFactory } from './circle/circleClonesFactory';
import { CircleFactory } from './circle/circleFactory';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { ProfileClonesFactory } from './profile/profileClonesFactory';
import { ProfileFactory } from './profile/profileFactory';
import {
  Circle,
  PublicProfile,
  CircleClone,
  PublicProfileClone,
} from '@myiworlds/types';

export const factoriesSwitch = (
  document: Circle | CircleClone | PublicProfile | PublicProfileClone,
) => {
  switch (document.collection) {
    case FIRESTORE_COLLECTIONS.PROFILES: {
      return new ProfileFactory();
    }

    case FIRESTORE_COLLECTIONS.PROFILES_CLONES: {
      return new ProfileClonesFactory();
    }

    case FIRESTORE_COLLECTIONS.CIRCLES_CLONES: {
      return new CircleClonesFactory();
    }

    case FIRESTORE_COLLECTIONS.CIRCLES:
    default: {
      return new CircleFactory();
    }
  }
};
