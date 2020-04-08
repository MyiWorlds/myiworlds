import addToProfileHistory from './addToProfileHistory';
import cloneDocument from './cloneDocument';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { RESPONSE_CODES, SHARED_TYPES } from '@myiworlds/enums';
import {
  isCreator,
  isEditor,
  isRequestingUser,
} from '@myiworlds/helper-functions';
import {
  Context,
  PublicProfile,
  PublicProfileClone,
  Circle,
  CircleClone,
  User,
  UserClone,
} from '@myiworlds/types';

interface Response {
  status: string;
  message: string;
  updatedDocumentId: string | null;
  previousCloneId: string | null;
}

export default async function updateDocumentById(
  updatedDocument:
    | Circle
    | User
    | CircleClone
    | PublicProfileClone
    | UserClone
    | PublicProfile,
  context: Context,
  merge: boolean,
  addToHistory?: boolean,
) {
  let response: Response = {
    status: '',
    message: '',
    updatedDocumentId: null,
    previousCloneId: null,
  };

  if (!context.userId || !context.selectedProfileId) {
    response = {
      status: RESPONSE_CODES.ERROR,
      message:
        'Sorry, you must be a logged in user with profile to update content.',
      updatedDocumentId: null,
      previousCloneId: null,
    };
    return response;
  }

  if (!updatedDocument.id) {
    response = {
      status: RESPONSE_CODES.ERROR,
      message:
        'Sorry, I was not given a unique id. I need to know what it is you wish for me to update. Please try again.',
      updatedDocumentId: null,
      previousCloneId: null,
    };
    return response;
  }

  if (!updatedDocument.collection) {
    response = {
      status: RESPONSE_CODES.ERROR,
      message:
        'Sorry, I was not given a collection name. I have no idea where I would put this. Please add one.',
      updatedDocumentId: null,
      previousCloneId: null,
    };
    return response;
  }

  try {
    const documentToUpdate = await firestoreAdmin
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then((res: any) => res.data());

    await firestoreAdmin
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then(async (document: any) => {
        const doc = document.data();
        if (
          isCreator(
            documentToUpdate.creator,
            context.selectedProfileId as string,
          ) ||
          isEditor(
            documentToUpdate.editors,
            context.selectedProfileId as string,
          ) ||
          isRequestingUser(
            documentToUpdate.id,
            context.selectedProfileId as string,
          ) ||
          isRequestingUser(documentToUpdate.id, context.userId as string)
        ) {
          cloneDocument(doc);
          Object.keys(updatedDocument).forEach(
            (
              key: keyof (
                | Circle
                | User
                | CircleClone
                | PublicProfileClone
                | UserClone
                | PublicProfile),
            ) => {
              if (updatedDocument[key] === undefined) {
                delete updatedDocument[key];
              }
            },
          );

          if (updatedDocument && updatedDocument.id) {
            await firestoreAdmin
              .collection(updatedDocument.collection)
              .doc(updatedDocument.id)
              .set(updatedDocument, { merge: merge ? true : false });
          }

          response = {
            status: RESPONSE_CODES.SUCCESS,
            message: 'I successfully updated that for you.',
            updatedDocumentId: updatedDocument.id,
            previousCloneId: doc.id,
          };
        } else {
          response = {
            status: RESPONSE_CODES.ERROR,
            message:
              'Sorry, you must be the creator or an editor to update this.',
            updatedDocumentId: null,
            previousCloneId: null,
          };
        }
      });

    if (
      addToHistory ||
      (context.addToHistory &&
        addToHistory === undefined &&
        addToHistory !== false)
    ) {
      addToProfileHistory(SHARED_TYPES.UPDATED, updatedDocument, context);
    }
  } catch (error) {
    stackdriver.report(error);
    response = {
      status: RESPONSE_CODES.ERROR,
      message: 'Sorry, I had an error updating that.  Please try again.',
      updatedDocumentId: null,
      previousCloneId: null,
    };
  }

  return response;
}
