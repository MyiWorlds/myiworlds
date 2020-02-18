import circleSwitch from './circleSwitch';
import profileSwitch from './profileSwitch';
import { Circle, Context, PublicProfile } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

const collectionsSwitch = (
  switchType: string,
  document: Circle | PublicProfile,
  context: Context,
) => {
  switch (document.collection) {
    case FIRESTORE_COLLECTIONS.CIRCLES: {
      return circleSwitch(switchType, document, context);
    }
    case FIRESTORE_COLLECTIONS.PROFILES: {
      return profileSwitch(switchType, document as PublicProfile, context);
    }
    default: {
      return null;
    }
  }
};

export default collectionsSwitch;
