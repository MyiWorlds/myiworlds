import addToProfileHistory from '../mutations/addToProfileHistory';
import { Context } from '@myiworlds/types';
import { defaultCircleSwitch } from '../functions';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { userCanView } from '../rules';

export default async function getDocumentById(
  collection: string,
  id: string,
  context: Context,
) {
  console.time('getDocumentById time to complete: ');

  let response: any = null;

  if (id) {
    try {
      const document = await firestore
        .collection(collection)
        .doc(id)
        .get()
        .then((res: any) => res.data());

      if (!document) {
        response = null;
      } else if (userCanView(document, context)) {
        response = document;
      } else {
        response = {
          type: 'PERMISSION_DENIED',
          collection,
        };
        response = defaultCircleSwitch(response, context);
      }

      if (context.addToHistory) {
        const circle = {
          type: 'VIEWED',
          data: {
            id: response.id,
            collection: response.collection,
          },
        };

        addToProfileHistory(circle, context);
      }
    } catch (error) {
      stackdriver.report(error);
      response = null;
    }
  }
  console.timeEnd('getDocumentById time to complete: ');
  return response;
}
