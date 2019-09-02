import {
  firestore,
  stackdriver,
  firebaseAdmin,
} from '@myiworlds/cloud-services';

interface Response {
  status: string;
  message: string;
  createdDocumentId: string | null;
}

export default async function createUser(id: string | null, email: string) {
  const response: Response = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  try {
    const emailExists = await firestore
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!emailExists.empty) {
      stackdriver.report(
        'Someone tried creating an account with an email that already existed in Firestore, something must not have been cleaned up when an account was deleted',
      );
      response.status = 'ERROR';
      response.message = 'I had an error creating you.';

      if (id) {
        await firebaseAdmin.auth().deleteUser(id);
      }
    } else {
      const userCollection = 'users';

      if (!id) {
        id = firestore.collection(userCollection).doc().id;
      }

      const user = {
        id,
        collection: userCollection,
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        email,
        canCreate: true,
      };

      await firestore
        .collection('users')
        .doc(user.id)
        .set(user);

      response.status = 'SUCCESS';
      response.message = 'I created your user account, now change the world';
      response.createdDocumentId = user.id;
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = 'ERROR';
    response.message = 'I had an error creating you.';
  }
  return response;
}
