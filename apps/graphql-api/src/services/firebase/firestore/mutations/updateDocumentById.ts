import addToProfileHistory from './addToProfileHistory';
import cloneDocument from './cloneDocument';
import isSystemAdmin from './../../../../schema/circle/functions/isSystemAdmin';
import { circleFieldsFilter } from './../functions/circleFieldsFilter';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import {
  RESPONSE_CODES,
  SHARED_TYPES,
  FIRESTORE_COLLECTIONS,
} from '@myiworlds/enums';
import {
  isOwner,
  isCreator,
  isEditor,
  isRequestingUser,
} from '@myiworlds/helper-functions';
import {
  Context,
  UserProfileData,
  PublicProfileData,
  PublicProfileCloneHydrated,
  Circle,
  UpdateCircleMutation,
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
    | UpdateCircleMutation
    | User
    | UserClone
    | PublicProfileCloneHydrated
    | UserProfileData
    | PublicProfileData,
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
    await firestoreAdmin
      .collection(updatedDocument.collection)
      .doc(updatedDocument.id)
      .get()
      .then(async (document: any) => {
        const doc = document.data();

        if (!doc) {
          response = {
            status: RESPONSE_CODES.SUCCESS,
            message: 'Sorry, that document does not exist.',
            updatedDocumentId: null,
            previousCloneId: null,
          };
          return response;
        }

        let canEdit =
          isOwner(doc.owner || null, context.selectedProfileId as string) ||
          isCreator(doc.creator || null, context.selectedProfileId as string) ||
          isEditor(doc.editors || null, context.selectedProfileId as string) ||
          isRequestingUser(doc.id, context.selectedProfileId as string) ||
          isRequestingUser(doc.id, context.userId as string);

        if (!canEdit && context.isSystemAdmin) {
          const adminCanEdit = await isSystemAdmin(context.userId);
          canEdit = adminCanEdit;
        }

        if (canEdit) {
          cloneDocument(doc);
          Object.keys(updatedDocument).forEach(
            (
              key: keyof (
                | Circle
                | User
                | UserClone
                | PublicProfileCloneHydrated
                | UserProfileData
                | PublicProfileData),
            ) => {
              if (
                updatedDocument.collection === FIRESTORE_COLLECTIONS.CIRCLES
              ) {
                updatedDocument = circleFieldsFilter(updatedDocument as Circle);
              } else if (updatedDocument[key] === undefined) {
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
        addToHistory !== false &&
        (updatedDocument.collection === FIRESTORE_COLLECTIONS.CIRCLES ||
          updatedDocument.collection === FIRESTORE_COLLECTIONS.CIRCLES_CLONES))
    ) {
      addToProfileHistory(
        SHARED_TYPES.UPDATED,
        updatedDocument as Circle,
        context,
      );
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
