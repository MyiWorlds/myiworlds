import addToProfileHistory from './addToProfileHistory';
import {
  Circle,
  Context,
  Profile,
  User
  } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';

interface CreateDocumentResponse {
  status: string;
  message: string;
  createdDocumentId: string | null;
  contextProfileId: string;
}

const createDocument = async (
  documentToCreate: Circle | Profile | User,
  context: Context,
  addToHistory?: boolean,
): Promise<CreateDocumentResponse> => {
  console.time('Time to createDocument');
  const response: CreateDocumentResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
    contextProfileId: context.selectedProfileId,
  };

  try {
    if (!context.selectedProfileId) {
      response.status = 'ERROR';
      response.message = `You must be logged in to create`;

      return response;
    }

    if (!documentToCreate.collection) {
      response.status = 'ERROR';
      response.message =
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.';

      return response;
    }

    if (!documentToCreate.id) {
      const ref = firestore.collection(documentToCreate.collection).doc();

      documentToCreate.id = ref.id;
    }

    if (!documentToCreate.dateCreated) {
      documentToCreate.dateCreated = Date.now();
    }

    if (!documentToCreate.dateUpdated) {
      documentToCreate.dateUpdated = Date.now();
    }

    await firestore
      .collection(documentToCreate.collection)
      .doc(documentToCreate.id)
      .set(documentToCreate);

    response.status = 'SUCCESS';
    response.message = 'Entity was created';
    response.createdDocumentId = documentToCreate.id || null;

    if (
      response.status === 'SUCCESS' &&
      (addToHistory || (context.addToHistory && addToHistory === undefined))
    ) {
      const circle = {
        type: 'CREATED',
        data: {
          id: documentToCreate.id,
          collection: documentToCreate.collection,
        },
      };
      addToProfileHistory(circle, context);
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = 'ERROR';
    response.message = `There was an error creating the Entity. ${
      error.message
    }`;
    response.createdDocumentId = null;
  }
  console.timeEnd('Time to createDocument');
  return response;
};

export default createDocument;
