import { Circle, User, UserProfileData } from '@myiworlds/types';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';

// This should be in a cloud function
export default async function cloneDocument(
  doc: Circle | UserProfileData | User,
) {
  const newCollection = `${doc.collection}-clones` as
    | 'circles-clones'
    | 'profiles-clones'
    | 'users-clones';
  const ref = firestoreAdmin.collection(newCollection).doc();
  const newUid = ref.id;

  const clonedDoc: any = {
    ...doc,
    clonedFrom: doc.id,
    id: newUid,
    collection: newCollection,
  };

  try {
    await firestoreAdmin
      .collection(newCollection)
      .doc(newUid)
      .set(clonedDoc);
  } catch (error) {
    stackdriver.report(error);
  }
}
