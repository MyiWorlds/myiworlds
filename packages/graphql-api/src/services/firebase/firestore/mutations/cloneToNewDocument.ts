import { firestore, stackdriver } from '@myiworlds/cloud-services';
import {
  Circle,
  CircleClone,
  Profile,
  ProfileClone,
  User,
  UserClone,
} from '@myiworlds/types';

// This should be in a cloud function
export default async function cloneToNewDocument(doc: Circle | Profile | User) {
  console.time('cloneToNewDocument time to complete');
  const newCollection = `${doc.collection}-clones` as
    | 'circles-clones'
    | 'profiles-clones'
    | 'users-clones';
  const ref = firestore.collection(newCollection).doc();
  const newUid = ref.id;

  const clonedDoc: CircleClone | ProfileClone | UserClone = {
    ...doc,
    clonedFrom: doc.id,
    id: newUid,
    collection: newCollection,
  };

  try {
    await firestore
      .collection(newCollection)
      .doc(newUid)
      .set(clonedDoc);
  } catch (error) {
    stackdriver.report(error);
  }
  console.timeEnd('cloneToNewDocument time to complete');
}
