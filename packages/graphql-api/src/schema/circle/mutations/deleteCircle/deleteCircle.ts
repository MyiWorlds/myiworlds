import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { getDocumentsByFilters } from '../../../../services/firebase/firestore/queries';
import { IDeleteCircleResponse } from './deleteCircleTypes.d';
import {
  Context,
  IFilter,
  IGetDocumentsByFiltersResponse,
} from '@myiworlds/types';

async function batchDelete(
  collection: string,
  filters: IFilter[],
  context: Context,
) {
  let keepDeleting = true;
  let cursor = null;
  let count = 0;
  let deleted = false;

  while (keepDeleting) {
    const getPiiCircles: IGetDocumentsByFiltersResponse = await getDocumentsByFilters(
      collection,
      filters,
      {
        property: 'dateCreated',
        ascending: false,
      },
      1,
      cursor,
      context,
      undefined,
      ['id'],
    );

    if (getPiiCircles.lines.length) {
      count = count + getPiiCircles.lines.length;
      const batch = firestore.batch();

      getPiiCircles.lines.forEach((cloneId: string) => {
        const circleCloneRef = firestore.collection(collection).doc(cloneId);
        batch.delete(circleCloneRef);
      });

      await batch.commit();
    }

    if (getPiiCircles.data.cursor) {
      cursor = getPiiCircles.data.cursor;
    } else {
      cursor = null;
      keepDeleting = false;
      deleted = true;
    }
  }

  return {
    count,
    deleted,
  };
}

// This should be in a cloud function
export default async function deleteCircle(id: string, context: Context) {
  const response: IDeleteCircleResponse = {
    status: '',
    message: '',
    circleIdToDelete: id,
    circleDeleted: false,
    numberOfPiiCircleClones: 0,
    piiCircleClonesDeleted: false,
  };

  try {
    const circleToDelete = await firestore
      .collection('circles')
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (circleToDelete) {
      const deletePiiCircleClones = await batchDelete(
        'circles-clones',
        [
          {
            property: 'pii',
            condition: '==',
            value: true,
          },
          {
            property: 'clonedFrom',
            condition: '==',
            value: id,
          },
        ],
        context,
      );

      if (deletePiiCircleClones.deleted) {
        response.numberOfPiiCircleClones = deletePiiCircleClones.count;
        response.piiCircleClonesDeleted = deletePiiCircleClones.deleted;
      }

      const circleDeleted = await firestore
        .collection('circles')
        .doc(id)
        .delete();

      if (circleDeleted) {
        response.circleDeleted = true;

        response.status = 'SUCCESS';
        response.message = 'I deleted all your creations and your circle';
      }
    } else {
      response.status = 'DENIED';
      response.message = 'There is no circle with that ID';
    }
  } catch (error) {
    stackdriver.report(error);
  }
  return response;
}
