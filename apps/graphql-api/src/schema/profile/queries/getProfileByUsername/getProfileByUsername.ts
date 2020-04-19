import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { isAllowedUsername } from './../../mutations/shared/isAllowedUsername';

interface GetProfileByUsernameResponse {
  usernameAvailable: boolean;
  usernameInvalid: boolean;
}

const getProfileByUsername = async (username: string) => {
  username = username.toLowerCase();

  if (!isAllowedUsername(username)) {
    const response: GetProfileByUsernameResponse = {
      usernameAvailable: false,
      usernameInvalid: true,
    };
    return response;
  }

  try {
    const checkIfUsernameIsTaken = await firestoreAdmin
      .collection(FIRESTORE_COLLECTIONS.PROFILES)
      .where('username', '==', username)
      .limit(1)
      .get()
      .then((response: any) => {
        return response.docs;
      });

    if (checkIfUsernameIsTaken.length) {
      const response: GetProfileByUsernameResponse = {
        usernameAvailable: false,
        usernameInvalid: false,
      };
      return response;
    } else {
      const response: GetProfileByUsernameResponse = {
        usernameAvailable: true,
        usernameInvalid: false,
      };
      return response;
    }
  } catch (error) {
    stackdriver.report(error);
    const response: GetProfileByUsernameResponse = {
      usernameAvailable: false,
      usernameInvalid: false,
    };
    return response;
  }
};

export default getProfileByUsername;
