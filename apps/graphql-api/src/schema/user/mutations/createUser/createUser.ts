import { RESPONSE_CODES } from '@myiworlds/enums';
import {
  firebaseAdmin,
  firestoreAdmin,
  stackdriver,
} from '@myiworlds/services';

export interface CreateUserResponse {
  status: string;
  message: string;
  createdDocumentId: string | null;
}

export default async function createUser(
  id: string,
  email: string,
  photoURL: string | null,
) {
  const response: CreateUserResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  try {
    const emailExists = await firestoreAdmin
      .collection('users')
      .where('email', '==', email)
      .get();

    const userIsInFirestore = !emailExists.empty;

    if (userIsInFirestore) {
      stackdriver.report(
        'Someone tried creating an account with an email that already existed in Firestore, something must not have been cleaned up when an account was deleted.',
      );
      response.status = RESPONSE_CODES.ERROR;
      response.message = 'I had an error creating your user account.';
      response.createdDocumentId = null;

      await firebaseAdmin.auth().deleteUser(id);
      response.message =
        response.message +
        '  The account trying to be created was deleted from Firebase Auth.';

      return response;
    } else {
      const userCollection = 'users';

      const user = {
        id,
        collection: userCollection,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        email,
        photoURL,
      };

      await firestoreAdmin
        .collection('users')
        .doc(user.id)
        .set(user);

      response.status = RESPONSE_CODES.SUCCESS;
      response.message = 'I created your user account, now change the world.';
      response.createdDocumentId = user.id;
    }
  } catch (error) {
    stackdriver.report(error);
    await firebaseAdmin.auth().deleteUser(id);
    response.status = RESPONSE_CODES.ERROR;
    response.message =
      'I had an error creating you and deleted the Firebase account you tried to create.';
  }
  return response;
}
