import { Circle, Context } from '@myiworlds/types';
import { CIRCLE_TYPES } from '@myiworlds/enums';
import { CircleFactory } from '@myiworlds/factories';
import { createDocument, updateDocumentById } from '.';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { googleCloud } from '@myiworlds/credentials';

const addToEdge = (
  id: string,
  parentId: string,
  tags: string[],
  document: Circle,
  shouldUpdateParent: boolean,
  context: Context,
) => {
  if (!context.userId || !context.selectedProfileId) {
    return null;
  }

  const edgeItem = new CircleFactory().use(CIRCLE_TYPES.EDGE_NODE).create({
    selectedProfileId: googleCloud.applicationCreatorProfile,
    header: {
      id,
      type: CIRCLE_TYPES.EDGE_NODE,
      collection: FIRESTORE_COLLECTIONS.CIRCLES,
      tags,
      editors: [context.selectedProfileId],
      creator: googleCloud.applicationCreatorProfile,
      parent: parentId,
    },
    parentCircle: document,
  }) as Circle;

  if (edgeItem) {
    createDocument(edgeItem, context, false);
  }

  if (shouldUpdateParent) {
    updateDocumentById(
      {
        id: parentId,
        collection: FIRESTORE_COLLECTIONS.CIRCLES,
      },
      context,
      true,
      false,
    );
  }
};

export default addToEdge;
