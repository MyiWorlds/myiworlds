import addToProfileHistory from '../mutations/addToProfileHistory';
import { factoriesSwitch } from '@myiworlds/factories';
import { FIRESTORE_COLLECTIONS, SHARED_TYPES } from '@myiworlds/enums';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { userCanView } from '@myiworlds/helper-functions';
import {
  Context,
  Circle,
  CircleClone,
  PublicProfile,
  PublicProfileClone,
} from '@myiworlds/types';

export default async function getDocumentById(
  collection: string,
  id: string,
  context: Context,
  addToHistory?: boolean,
) {
  let response:
    | null
    | Circle
    | CircleClone
    | PublicProfile
    | PublicProfileClone = null;

  if (id) {
    try {
      const document = await firestoreAdmin
        .collection(collection)
        .doc(id)
        .get()
        .then((res: any) => res.data());

      if (!document) {
        response = null;
      } else if (userCanView(document, context)) {
        response = document;
      } else {
        response = factoriesSwitch(document)
          .use('PERMISSION_DENIED')
          .create();
      }

      if (
        addToHistory &&
        response &&
        response.collection !== FIRESTORE_COLLECTIONS.USERS &&
        response.collection !== FIRESTORE_COLLECTIONS.USERS_CLONES
      ) {
        addToProfileHistory(SHARED_TYPES.VIEWED, response, context);
      }
    } catch (error) {
      stackdriver.report(error);
      response = null;
    }
  }
  return response;
}
