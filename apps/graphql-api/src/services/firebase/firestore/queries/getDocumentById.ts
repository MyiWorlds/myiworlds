import addToProfileHistory from '../mutations/addToProfileHistory';
import collectionsSwitch from '../functions/collectionsSwitch';
import { Circle, Context, Profile } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '../../../../../../../libs/enums/src/firestoreCollections';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { SHARED_TYPES } from '../../../../../../../libs/enums/src/sharedTypes';
import { userCanView } from '../rules';

export default async function getDocumentById(
  collection: string,
  id: string,
  context: Context,
  addToHistory?: boolean,
) {
  let response: null | Circle | Profile = null;

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
        response = collectionsSwitch(
          SHARED_TYPES.PERMISSION_DENIED,
          document,
          context,
        );
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
