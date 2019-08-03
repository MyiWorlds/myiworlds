import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { getDocumentsByFilters } from '../../../../services/firebase/firestore/queries';
import { IDeleteProfileResponse } from './deleteProfileTypes.d';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';
import {
  Context,
  Profile,
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
export default async function deleteProfile(id: string, context: Context) {
  const response: IDeleteProfileResponse = {
    status: '',
    message: '',
    profileIdToDelete: id,
    profileDeleted: false,
    numberOfPiiCircles: 0,
    piiCirclesDeleted: false,
    numberOfPiiCircleClones: 0,
    piiCircleClonesDeleted: false,
    numberOfAppCreatedCirclesForProfile: 0,
    appCreatedCirclesForProfileDeleted: false,
    numberOfAppCreatedCircleClonesForProfile: 0,
    appCreatedCircleClonesForProfileDeleted: false,
  };

  try {
    const user = await firestore
      .collection('users')
      .doc(context.userId)
      .get()
      .then((res: any) => res.data());

    const profileToDelete = await firestore
      .collection('profiles')
      .doc(id)
      .get()
      .then((res: any) => res.data());

    if (profileToDelete.id === id && user.profiles.includes(id)) {
      const deletePiiCircles = await batchDelete(
        'circles',
        [
          {
            property: 'pii',
            condition: '==',
            value: true,
          },
          {
            property: 'owner',
            condition: '==',
            value: id,
          },
        ],
        context,
      );

      if (deletePiiCircles.deleted) {
        response.numberOfPiiCircles = deletePiiCircles.count;
        response.piiCirclesDeleted = deletePiiCircles.deleted;
      }

      const deletePiiCircleClones = await batchDelete(
        'circles-clones',
        [
          {
            property: 'pii',
            condition: '==',
            value: true,
          },
          {
            property: 'owner',
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
      const deletePiiCirclesAppCreated = await batchDelete(
        'circles',
        [
          {
            property: 'pii',
            condition: '==',
            value: true,
          },
          {
            property: 'editors',
            condition: 'array-contains',
            value: id,
          },
          {
            property: 'owner',
            condition: '==',
            value: 'APP',
          },
        ],
        context,
      );

      if (deletePiiCirclesAppCreated.deleted) {
        response.numberOfAppCreatedCirclesForProfile =
          deletePiiCirclesAppCreated.count;
        response.appCreatedCirclesForProfileDeleted =
          deletePiiCirclesAppCreated.deleted;
      }

      const deletePiiCircleClonesAppCreated = await batchDelete(
        'circles-clones',
        [
          {
            property: 'pii',
            condition: '==',
            value: true,
          },
          {
            property: 'editors',
            condition: 'array-contains',
            value: id,
          },
          {
            property: 'owner',
            condition: '==',
            value: 'APP',
          },
        ],
        context,
      );

      if (deletePiiCircleClonesAppCreated.deleted) {
        response.numberOfAppCreatedCircleClonesForProfile =
          deletePiiCircleClonesAppCreated.count;
        response.appCreatedCircleClonesForProfileDeleted =
          deletePiiCircleClonesAppCreated.deleted;
      }

      const profileDeleted = await firestore
        .collection('profiles')
        .doc(id)
        .delete();

      if (profileDeleted) {
        response.profileDeleted = true;

        const updatedUser = {
          id: context.userId,
          collection: 'users',
          profiles: user.profiles.filter((profile: Profile) => profile !== id),
        };

        await updateDocumentById(updatedUser, context, true);

        response.status = 'SUCCESS';
        response.message = 'I deleted all your creations and your profile';
      }
    } else {
      response.status = 'DENIED';
      response.message = 'There is no profile with that ID';
    }
  } catch (error) {
    stackdriver.report(error);
  }
  return response;
}
