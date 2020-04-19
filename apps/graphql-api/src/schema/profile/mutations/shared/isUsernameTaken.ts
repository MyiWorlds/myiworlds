import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { firestoreAdmin } from '@myiworlds/services';

export default async function isUsernameTaken(username: string) {
  return firestoreAdmin
    .collection(FIRESTORE_COLLECTIONS.PROFILES)
    .where('username', '==', username)
    .limit(1)
    .get()
    .then((response: any) => {
      return response.docs.length ? true : false;
    });
}
