import createDocument from './../../../../services/firebase/firestore/mutations/createDocument';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Circle, Context } from '@myiworlds/types';
import { CopyCircleResponse } from './copyCircleTypes';
import { createCollectionId } from '../../../../services/firebase/firestore/functions/createCollectionId';
import { FIRESTORE_COLLECTIONS, RESPONSE_CODES } from '@myiworlds/enums';
import { stackdriver } from '@myiworlds/services';
import { userCanView } from '@myiworlds/helper-functions';

export default async function copyCircle(
  circleIdToCopy: string,
  context: Context,
) {
  const response: CopyCircleResponse = {
    status: '',
    message: '',
    createdDocumentId: null,
  };

  try {
    let circleToCopy: Circle | null = await getDocumentById(
      FIRESTORE_COLLECTIONS.CIRCLES,
      circleIdToCopy,
      context,
    );

    if (!context.selectedProfileId) {
      response.status = RESPONSE_CODES.ERROR;
      response.message = 'You must be logged in to copy.';
      return response;
    }

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
      public: false,
      creator: context.selectedProfileId,
      owner: context.selectedProfileId,
      viewers: [],
      editors: [context.selectedProfileId],
      dateCreated: Date.now(),
      dateUpdated: Date.now(),
    };

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
