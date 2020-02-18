import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { User } from '@myiworlds/types';

const getUserById = async (userId: string | null) => {
  if (userId) {
    try {
      const userDoc = await firestoreAdmin.doc(`users/${userId}`).get();
      if (userDoc.exists) {
        const user = userDoc.data();
        return user as User;
      }
    } catch (error) {
      stackdriver.report(error);
    }
  }
  return null;
};

export default getUserById;
