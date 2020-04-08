import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
// import { User } from '@myiworlds/types';

const getUserProfiles = async (userId: string | null) => {
  if (userId) {
    try {
      const profiles = await firestoreAdmin
        .collection(FIRESTORE_COLLECTIONS.PROFILES)
        .where('userId', '==', userId)
        .get()
        .then((res: any) => {
          if (res.docs.length) {
            return res.docs.map((doc: any) => doc.data());
          } else {
            return [];
          }
        });

      return profiles;
    } catch (error) {
      stackdriver.report(error);
    }
  }
  return [];
};

export default getUserProfiles;
