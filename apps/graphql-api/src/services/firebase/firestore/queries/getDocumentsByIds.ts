import addToProfileHistory from '../mutations/addToProfileHistory';
import {
  Circle,
  CircleClone,
  Context,
  FirestoreCollectionTypes,
  PublicProfile,
  PublicProfileClone
  } from '@myiworlds/types';
import { CircleFactory, factoriesSwitch } from '@myiworlds/factories';
import { FIRESTORE_COLLECTIONS, SHARED_TYPES } from '@myiworlds/enums';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { userCanView } from '@myiworlds/helper-functions';

export default async function getDocumentsByIds(
  collection: FirestoreCollectionTypes,
  ids: string[],
  context: Context,
  addToHistory?: boolean,
) {
  let response: (Circle | CircleClone | PublicProfile | PublicProfileClone)[] = [];

  if (addToHistory === undefined) {
    addToHistory = context.addToHistory;
  }

  try {
    if (ids) {
      const docIds: FirebaseFirestore.DocumentReference[] = ids.map(
        (id: string) => {
          return firestoreAdmin.doc(`${collection}/${id}`);
        },
      );

      const getDocuments = await firestoreAdmin
        .getAll(...docIds)
        .then((docs: FirebaseFirestore.DocumentSnapshot[]) => {
          return docs.map((doc: FirebaseFirestore.DocumentSnapshot) =>
            doc.data(),
          );
        });

      if (addToHistory && context.selectedProfileId) {
        const circle = new CircleFactory().use('VIEWED_BY_IDS').create({
          selectedProfileId: context.selectedProfileId,
          header: {
            id: null,
            collection: FIRESTORE_COLLECTIONS.CIRCLES,
          },
          collection,
          ids,
        })

        addToProfileHistory(
          SHARED_TYPES.VIEWED_BY_IDS,
          circle as Circle,
          context,
        );
      }

      // Transform undefined into objects
      // As we want to see something in the UI representing the broken ones
      const queryResultOrder = getDocuments.reduce(
        (lookupTable: any, item: any) => {
          if (item) {
            lookupTable[item.id] = item;
          }
          return lookupTable;
        },
        {},
      );

      const sortedEntities = ids.reduce((matchingItems: any, id: string) => {
        const item = queryResultOrder[id];

        if (item) {
          matchingItems.push(item);
        }
        if (item === undefined) {
          matchingItems.push({
            id,
            type: SHARED_TYPES.DOES_NOT_EXIST,
            collection,
          });
        }

        return matchingItems;
      }, []);

      sortedEntities.forEach((document: any) => {
        if (document.type === SHARED_TYPES.DOES_NOT_EXIST) {
          const doc: PublicProfile | Circle | null = factoriesSwitch(
            document,
          )?.use('DOES_NOT_EXIST');
          if (doc) {
            response.push(doc);
          }
        } else if (userCanView(document, context)) {
          response.push(document);
        } else {
          document.type = SHARED_TYPES.PERMISSION_DENIED;
          const doc: Circle| CircleClone | PublicProfile| PublicProfileClone | null = factoriesSwitch(document)
          .use('PERMISSION_DENIED')
          .create();

          if (doc) {
            response.push(doc);
          }
        }
      });
    }
  } catch (error) {
    stackdriver.report(error);
    response = [];
  }
  return response;
}
