import addToProfileHistory from '../mutations/addToProfileHistory';
import collectionsSwitch from '../functions/collectionsSwitch';
import { Circle, Context } from '@myiworlds/types';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { PublicProfile } from '../../../../../../../libs/types/src/profile';
import { SHARED_TYPES } from '@myiworlds/enums';
import { userCanView } from '../rules';

export default async function getDocumentsByIds(
  collection: string,
  ids: string[],
  context: Context,
  addToHistory?: boolean,
) {
  let response: (Circle | PublicProfile)[] = [];

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

      if (addToHistory) {
        const circle = {
          type: SHARED_TYPES.VIEWED_BY_IDS,
          data: {
            collection,
            lines: ids,
          },
        };

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
          const doc: PublicProfile | Circle | null = collectionsSwitch(
            SHARED_TYPES.DOES_NOT_EXIST,
            document,
            context,
          );
          if (doc) {
            response.push(doc);
          }
        } else if (userCanView(document, context)) {
          response.push(document);
        } else {
          document.type = SHARED_TYPES.PERMISSION_DENIED;
          const doc: PublicProfile | Circle | null = collectionsSwitch(
            SHARED_TYPES.PERMISSION_DENIED,
            document,
            context,
          );
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
