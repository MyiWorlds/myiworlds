import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { firestoreAdmin } from '@myiworlds/services';

const getCircleByProfileUsername = async (
  username: string,
  context: Context,
) => {
  username.toLowerCase();

  const query = firestoreAdmin
    .collection(FIRESTORE_COLLECTIONS.PROFILES)
    .where('username', '==', username)
    .select('publicHome')
    .limit(1);

  const profile = await query.get().then((res: any) => {
    const results =
      res.docs.length && res.docs[0].data() ? res.docs[0].data() : null;
    return results;
  });

  if (profile.publicHome) {
    const getProfilesPublicHomeCircle = await getDocumentById(
      FIRESTORE_COLLECTIONS.CIRCLES,
      profile.publicHome,
      context,
    );
    return getProfilesPublicHomeCircle;
  } else {
    return null;
  }
};

export default getCircleByProfileUsername;
