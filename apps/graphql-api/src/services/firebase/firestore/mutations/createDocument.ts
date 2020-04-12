import addToProfileHistory from './addToProfileHistory';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import {
  Circle,
  CircleClone,
  Context,
  UserProfileData,
  UserProfileCloneData,
  User,
} from '@myiworlds/types';
import {
  SHARED_TYPES,
  RESPONSE_CODES,
  FIRESTORE_COLLECTIONS,
} from '@myiworlds/enums';

interface CreateDocumentResponse {
  status: string;
  message: string;
  createdDocumentId: string | null;
}

const createDocument = async (
  documentToCreate:
    | Circle
    | CircleClone
    | UserProfileData
    | UserProfileCloneData
    | User,
  context: Context,
  addToHistory?: boolean,
): Promise<CreateDocumentResponse> => {
  const response: CreateDocumentResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  if (addToHistory === undefined) {
    addToHistory = context.addToHistory;
  }

  if (!context.selectedProfileId) {
    response.status = RESPONSE_CODES.ERROR;
    response.message = `You must be logged in to create`;

    return response;
  }

  if (!documentToCreate.collection) {
    response.status = RESPONSE_CODES.ERROR;
    response.message =
      'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.';

    return response;
  }

  try {
    if (!documentToCreate.id) {
      const ref = firestoreAdmin.collection(documentToCreate.collection).doc();

      documentToCreate.id = ref.id;
    }

    if (!documentToCreate.dateCreated) {
      documentToCreate.dateCreated = Date.now();
    }

    if (!documentToCreate.dateUpdated) {
      documentToCreate.dateUpdated = Date.now();
    }

    await firestoreAdmin
      .collection(documentToCreate.collection)
      .doc(documentToCreate.id)
      .set(documentToCreate);

    response.status = RESPONSE_CODES.SUCCESS;
    response.message = 'Document was created';
    response.createdDocumentId = documentToCreate.id || null;

    if (
      response.status === RESPONSE_CODES.SUCCESS &&
      addToHistory &&
      (documentToCreate.collection === FIRESTORE_COLLECTIONS.CIRCLES &&
        documentToCreate.collection === FIRESTORE_COLLECTIONS.CIRCLES_CLONES)
    ) {
      addToProfileHistory(
        SHARED_TYPES.CREATED,
        documentToCreate as Circle | CircleClone,
        context,
      );
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = RESPONSE_CODES.ERROR;
    response.message = `There was an error creating the Document. ${error.message}`;
    response.createdDocumentId = null;
  }
  return response;
};

export default createDocument;
