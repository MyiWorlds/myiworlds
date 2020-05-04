import createDocument from './../../../../services/firebase/firestore/mutations/createDocument';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { CopyCircleResponse } from './copyCircleTypes';
import { createCollectionId } from '../../../../services/firebase/firestore/functions/createCollectionId';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { stackdriver } from '@myiworlds/services';
import { userCanView } from '@myiworlds/helper-functions';

export default async function copyCircle(
  circleIdToCopy: string,
  collection: 'circles' | 'circles-clones',
  context: Context,
) {
  const response: CopyCircleResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  if (!context.selectedProfileId) {
    response.status = RESPONSE_CODES.ERROR;
    response.message = 'You must be logged in to copy.';
    return response;
  }

  try {
    let circleToCopy: any = await getDocumentById(
      collection,
      circleIdToCopy,
      context,
    );

    if (!circleToCopy) {
      response.status = RESPONSE_CODES.ERROR;
      response.message = 'The Circle you gave me to copy does not exist.';
      return response;
    }

    if (!userCanView(circleToCopy, context)) {
      response.status = RESPONSE_CODES.ERROR;
      response.message =
        'You do not have the correct permissions to view that, so I can not allow you to copy it.';
      return response;
    }

    circleToCopy = {
      ...circleToCopy,
      id: createCollectionId(FIRESTORE_COLLECTIONS.CIRCLES),
      collection: FIRESTORE_COLLECTIONS.CIRCLES,
      copiedFrom: circleIdToCopy,
      copiedFromClone: collection === FIRESTORE_COLLECTIONS.CIRCLES_CLONES,
      public: false,
      creator: context.selectedProfileId,
      owner: context.selectedProfileId,
      viewers: [],
      editors: [context.selectedProfileId],
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

    if (circleToCopy.clonedFrom) {
      delete circleToCopy.clonedFrom;
    }

    const copiedCircle = await createDocument(circleToCopy, context);

    if (copiedCircle) {
      response.status = RESPONSE_CODES.SUCCESS;
      response.message = 'I successfully copied that for you.';
      response.createdDocumentId = copiedCircle.createdDocumentId;
      return response;
    } else {
      response.status = RESPONSE_CODES.ERROR;
      response.message =
        'Something went wrong trying to copy that circle, please try again.';
      return response;
    }
  } catch (error) {
    stackdriver.report(error);
    response.status = RESPONSE_CODES.ERROR;
    response.message =
      'I had an error trying to copy that, I have alerted my creators of this.';
    return response;
  }
}
