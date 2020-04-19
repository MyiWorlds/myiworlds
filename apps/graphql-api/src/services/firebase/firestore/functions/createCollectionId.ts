import { firestoreAdmin } from '@myiworlds/services';
import { FirestoreCollectionTypes } from '@myiworlds/types';

export const createCollectionId = (collection: FirestoreCollectionTypes) => {
  return firestoreAdmin.collection(collection).doc().id;
};
