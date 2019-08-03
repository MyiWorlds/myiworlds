import { batchDeleteClonesAndDocument } from '../functions';
import { Context } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { isCreator, isRequestingUser } from '../rules';
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
  console.time('deleteDocument time to complete');

  let response: Response = {
    status: '',
    message: '',
    uidToDelete: id,
    numberOfClones: 0,
    clonesDeleted: false,
    wasDeleted: false,
  };

  // const maxQueryResults = 499;

  try {
    const documentExists = await firestore
      .collection(collection)
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (!documentExists) {
      response = {
        status: 'ERROR',
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
        status: 'ERROR',
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
      status: 'ERROR',
      message: 'I had an error, please refresh and try again try again.',
      uidToDelete: id,
      numberOfClones: response.numberOfClones,
      clonesDeleted: response.clonesDeleted,
      wasDeleted: false,
    };
  }
  console.timeEnd('deleteDocument time to complete');
  return response;
}
