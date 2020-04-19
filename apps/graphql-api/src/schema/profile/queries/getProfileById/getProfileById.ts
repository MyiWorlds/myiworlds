import { Context, UserProfileData } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { firestoreAdmin } from '@myiworlds/services';

const getProfileById = async (id: string, context: Context) => {
  const profileRequested: UserProfileData | null = await await firestoreAdmin
    .collection(FIRESTORE_COLLECTIONS.PROFILES)
    .doc(id)
    .get()
    .then((res: any) => res.data());

  if (profileRequested && profileRequested.userId === context.userId) {
    return profileRequested;
  } else {
    return null;
  }
};

export default getProfileById;
