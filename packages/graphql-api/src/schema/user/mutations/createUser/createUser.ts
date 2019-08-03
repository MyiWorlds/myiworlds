import { Context } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';

interface Response {
  status: string;
  message: string;
  createdDocumentId: string | null;
}

export default async function createUser(
  id: string | null,
  email: string,
  context: Context,
) {
  const response: Response = {
    status: '',
    message: '',
    createdDocumentId: null,
  };
  // Do somethign with context to check if they can create account
  console.log(context);

  try {
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
  } catch (error) {
    stackdriver.report(error);
    response.status = 'ERROR';
    response.message = 'I had an error creating you.';
  }
  return response;
}
