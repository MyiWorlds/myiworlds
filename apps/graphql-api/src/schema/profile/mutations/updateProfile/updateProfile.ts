import isUsernameTaken from '../shared/isUsernameTaken';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { isAllowedUsername } from '../shared/isAllowedUsername';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  contextProfileId: string;
}

interface ProfileArgs {
  id: string;
  username: string | undefined;
}

// This should be in a cloud function
export default async function updateProfile(
  profile: ProfileArgs,
  context: Context,
) {
  if (!context.selectedProfileId) {
    return {
      status: RESPONSE_CODES.ERROR,
      message: 'There users profile was not accepted, log in and try again.',
      updatedDocumentId: null,
      contextProfileId: '',
    };
  }

  let username = profile.username;
  if (username) {
    username = username.toLowerCase();

    if (!isAllowedUsername(username)) {
      const response: Response = {
        status: RESPONSE_CODES.DENIED,
        message:
          'I am sorry, I can not let you use that username.  Please try another',
        updatedDocumentId: null,
        contextProfileId: context.selectedProfileId,
      };
      return response;
    }

    if (await isUsernameTaken(username)) {
      const response: Response = {
        status: RESPONSE_CODES.DENIED,
        message: 'I am sorry, that username is already taken',
        updatedDocumentId: null,
        contextProfileId: context.selectedProfileId,
      };
      return response;
    }
  }

  const profileToClean: any = {
    id: profile.id,
    collection: FIRESTORE_COLLECTIONS.PROFILES,
    username,
  };

  const profileCleaned = [
    Object.keys(profileToClean).forEach(
      (key: string) =>
        profileToClean[key] === undefined && delete profileToClean[key],
    ),
    profileToClean,
  ][1];

  return await updateDocumentById(profileCleaned, context, true);
}
