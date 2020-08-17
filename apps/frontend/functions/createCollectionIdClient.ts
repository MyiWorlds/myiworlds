import firestoreClient from './../lib/firebase/firestoreClient';
import { FirestoreCollectionTypes } from '@myiworlds/types';

export const createCollectionIdClient = (
  collection: FirestoreCollectionTypes,
  prefix?: string,
) => {
  if (prefix) {
    return prefix + '-' + firestoreClient.collection(collection).doc().id;
  } else {
    return firestoreClient.collection(collection).doc().id;
  }
};
