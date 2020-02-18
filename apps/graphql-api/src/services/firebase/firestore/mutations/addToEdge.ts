import { CIRCLE_TYPES } from '@myiworlds/enums';
import { createDocument, updateDocumentById } from '.';
import { FIRESTORE_COLLECTIONS } from '../../../../../../../libs/enums/src/firestoreCollections';
import { googleCloud } from '@myiworlds/credentials';
import {
  Circle,
  CircleClone,
  Context,
  PublicProfile,
  PublicProfileClone,
} from '@myiworlds/types';

const addToEdge = (
  parentId: string,
  tags: string[],
  document: Circle | PublicProfile | CircleClone | PublicProfileClone,
  shouldUpdateParent: boolean,
  context: Context,
) => {
  if (!context.userId || !context.selectedProfileId) {
    return null;
  }
  const edgeItem: Circle = {
    id: null,
    type: CIRCLE_TYPES.EDGE_NODE,
    collection: FIRESTORE_COLLECTIONS.CIRCLES,
    tags,
    parent: parentId,
    editors: [context.selectedProfileId],
    creator: googleCloud.applicationCreatorProfile,
    data: {
      id: document.id,
      collection: document.collection,
    },
  };

  createDocument(edgeItem, context, false);

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
