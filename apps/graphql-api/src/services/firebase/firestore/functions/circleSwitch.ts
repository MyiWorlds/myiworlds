import { Circle, Context } from '@myiworlds/types';
import { googleCloud } from '@myiworlds/credentials';
import {
  CIRCLE_TYPES,
  FIRESTORE_COLLECTIONS,
  SHARED_TYPES,
} from '@myiworlds/enums';

const circleSwitch = (circleType: string, circle: Circle, context: Context) => {
  switch (circleType) {
    case SHARED_TYPES.UPDATED:
    case SHARED_TYPES.CREATED:
    case SHARED_TYPES.VIEWED: {
      if (!context.profileHistoryId || !context.selectedProfileId) {
        return null;
      } else {
        return {
          id: circleType,
          collection: FIRESTORE_COLLECTIONS.CIRCLES,
          type: CIRCLE_TYPES.EDGE_NODE,
          tags: [circleType],
          parent: context.profileHistoryId,
          creator: googleCloud.applicationCreatorProfile,
          editors: [context.selectedProfileId],
          data: {
            id: circle.id,
            collection: circle.collection,
          },
        };
      }
    }
    case SHARED_TYPES.PERMISSION_DENIED: {
      return {
        id: circleType,
        collection: FIRESTORE_COLLECTIONS.CIRCLES,
        type: circleType,
        title: 'Sorry, you do not have the required permissions to see this.',
      };
    }
    case SHARED_TYPES.DOES_NOT_EXIST:
    default: {
      return circle;
    }
  }
};

export default circleSwitch;
