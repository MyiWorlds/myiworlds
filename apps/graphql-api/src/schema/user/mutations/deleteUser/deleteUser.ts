import { Context } from '@myiworlds/types';
import { RESPONSE_CODES } from '@myiworlds/enums';
import {
  firebaseAdmin,
  firestoreAdmin,
  stackdriver,
} from '@myiworlds/services';

export interface DeleteUserResponse {
  status: string;
  message: string;
  userDeleted: boolean;
}

export default async function deleteUser(context: Context) {
  const response: DeleteUserResponse = {
    status: '',
    message: '',
    userDeleted: false,
  };

  if (!context.userId) {
    response.status = RESPONSE_CODES.ERROR;
    response.message =
      'You need to be logged in as a valid user to delete a User account.';

    return response;
  }

  try {
    const userExists = await firestoreAdmin
      .doc(`users/${context.userId}`)
      .get();

    if (userExists) {
      await firebaseAdmin.auth().deleteUser(context.userId);
      await firestoreAdmin
        .collection('users')
        .doc(context.userId)
        .delete();

      response.status = RESPONSE_CODES.SUCCESS;
      response.message = 'Your User account has been deleted.';
      response.userDeleted = true;
      return response;
    } else {
      response.status = RESPONSE_CODES.ERROR;
      response.message = 'The User account you tried to delete did not exist.';
      return response;
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = RESPONSE_CODES.ERROR;
    response.message = 'I had an error deleting your User account.';
    return response;
  }
}
