import { Circle, Context, PublicProfile } from '@myiworlds/types';
import { CIRCLE_TYPES, SHARED_TYPES } from '@myiworlds/enums';
import { FIRESTORE_COLLECTIONS } from '../../../../../../../libs/enums/src/firestoreCollections';
import { googleCloud } from '@myiworlds/credentials';

const profileSwitch = (
  profileType: string,
  profile: PublicProfile,
  context: Context,
) => {
  switch (profileType) {
    case SHARED_TYPES.UPDATED:
    case SHARED_TYPES.CREATED:
    case SHARED_TYPES.VIEWED: {
      if (!context.profileHistoryId || !context.selectedProfileId) {
        return null;
      } else {
        return {
          id: profileType,
          collection: FIRESTORE_COLLECTIONS.CIRCLES,
          type: CIRCLE_TYPES.EDGE_NODE,
          tags: [profileType],
          parent: context.profileHistoryId,
          creator: googleCloud.applicationCreatorProfile,
          editors: [context.selectedProfileId],
          data: {
            id: profile.id,
            collection: profile.collection,
          },
        } as Circle;
      }
    }
    case SHARED_TYPES.PERMISSION_DENIED: {
      return {
        id: profileType,
        collection: FIRESTORE_COLLECTIONS.PROFILES,
        username: 'profile',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        theme: undefined,
        publicProfile: undefined,
      };
    }
    case SHARED_TYPES.DOES_NOT_EXIST:
    default: {
      return {
        id: profileType,
        collection: FIRESTORE_COLLECTIONS.PROFILES,
        username: 'does-not-exist',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        theme: undefined,
        publicProfile: undefined,
      };
    }
  }
};

export default profileSwitch;
