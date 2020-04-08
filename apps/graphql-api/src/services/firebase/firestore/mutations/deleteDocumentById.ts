import batchDeleteClonesAndDocument from '../functions/batchDeleteClonesAndDocument';
import { Context } from '@myiworlds/types';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { isCreator, isRequestingUser } from '@myiworlds/helper-functions';
import { RESPONSE_CODES } from '@myiworlds/enums';

// import getDocumentsByFilters from '../queries/getDocumentsByFilters';

interface Response {
  status: string;
  message: string;
  uidToDelete: string;
  numberOfClones: number;
  clonesDeleted: boolean;
  wasDeleted: boolean;
}

export default async function deleteDocument(
  collection: string,
  id: string,
  context: Context,
) {
  let response: Response = {
    status: RESPONSE_CODES.ERROR,
    message: '',
    uidToDelete: id,
    numberOfClones: 0,
    clonesDeleted: false,
    wasDeleted: false,
  };

  if (!context.selectedProfileId || !context.userId) {
    return response;
  }

  // const maxQueryResults = 499;

  try {
    const documentExists = await firestoreAdmin
      .collection(collection)
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (!documentExists) {
      response = {
        status: RESPONSE_CODES.ERROR,
        message:
          'I could not find what you are trying to delete, it no longer exists.',
        uidToDelete: id,
        numberOfClones: 0,
        clonesDeleted: false,
        wasDeleted: false,
      };
    }

    if (
      isCreator(documentExists.creator, context.selectedProfileId) ||
      isRequestingUser(documentExists.id, context.userId)
    ) {
      response = await batchDeleteClonesAndDocument(collection, id);
    } else {
      response = {
        status: RESPONSE_CODES.ERROR,
        message:
          'Sorry, I could not delete that. You must be the creator to delete this.',
        uidToDelete: id,
        numberOfClones: response.numberOfClones,
        clonesDeleted: response.clonesDeleted,
        wasDeleted: false,
      };
    }
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: RESPONSE_CODES.ERROR,
      message: 'I had an error, please refresh and try again try again.',
      uidToDelete: id,
      numberOfClones: response.numberOfClones,
      clonesDeleted: response.clonesDeleted,
      wasDeleted: false,
    };
  }
  return response;
}
