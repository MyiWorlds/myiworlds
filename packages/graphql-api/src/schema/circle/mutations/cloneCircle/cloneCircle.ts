import { Circle, Context } from '@myiworlds/types';
import { createDocument } from '../../../../services/firebase/firestore/mutations';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ICloneCircleResponse } from './cloneCircleTypes';
import { stackdriver } from '@myiworlds/cloud-services';
import { userCanView } from '../../../../services/firebase/firestore/rules/userCanView';

export default async function cloneCircle(
  id: string,
  context: Context,
): Promise<ICloneCircleResponse> {
  try {
    let circleToCopy: Circle = await getDocumentById('circles', id, context);

    if (!circleToCopy) {
      return {
        message: 'The Circle you gave me to copy does not exist.',
        clonedCircleId: null,
      };
    }

    if (!userCanView(circleToCopy, context)) {
      return {
        message:
          'You do not have the correct permissions to view that, so I can not allow you to copy it.',
        clonedCircleId: null,
      };
    }

    circleToCopy = {
      ...circleToCopy,
      public: false,
      viewers: [],
      editors: [],
      dateCreated: null,
      dateUpdated: null,
      creator: context.selectedProfileId,
      owner: context.selectedProfileId,
    };

    delete circleToCopy.id;

    const createCircle = await createDocument(circleToCopy, context);

    if (createCircle) {
      return {
        message: 'I successfully cloned that for you.',
        clonedCircleId: createCircle.createdDocumentId,
      };
    } else {
      return {
        message: 'I successfully cloned that for you.',
        clonedCircleId: null,
      };
    }
  } catch (error) {
    stackdriver.report(error);

    return {
      message:
        'O my, something went something went wrong.  Try again or my creators are probably going to need to fix me',
      clonedCircleId: null,
    };
  }
}
