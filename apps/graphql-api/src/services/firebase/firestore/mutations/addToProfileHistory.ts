import addToEdge from './addToEdge';
import { Circle, Context } from '@myiworlds/types';
import { createCollectionId } from '../functions/createCollectionId';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

const addToProfileHistory = (
  interactionType: string,
  document: Circle,
  context: Context,
) => {
  if (context.userId && context.profileHistoryId && document) {
    addToEdge(
      createCollectionId(FIRESTORE_COLLECTIONS.CIRCLES),
      context.profileHistoryId,
      [interactionType],
      document,
      true,
      context,
    );
    return;
  } else {
    return;
  }
};

export default addToProfileHistory;
