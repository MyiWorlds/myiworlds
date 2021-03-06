import { firestoreAdmin, stackdriver } from '@myiworlds/services';
import { RESPONSE_CODES } from '@myiworlds/enums';

interface Response {
  status: string;
  message: string;
  uidToDelete: string;
  numberOfClones: number;
  clonesDeleted: boolean;
  wasDeleted: boolean;
}

const batchDeleteClonesAndDocument = async (collection: string, id: string) => {
  let response: Response = {
    status: '',
    message: '',
    uidToDelete: id,
    numberOfClones: 0,
    clonesDeleted: false,
    wasDeleted: false,
  };

  try {
    let keepDeleting = true;
    let cursor: string | null = null;

    while (keepDeleting) {
      const clones = await firestoreAdmin
        .collection(`${collection}-clones`)
        .where(`${collection}Id`, '==', id)
        .orderBy('dateCreated', 'desc')
        .select('id')
        .startAfter(cursor)
        .limit(100) // This number can probably be increased quite abit
        .get();

      if (clones.empty) {
        keepDeleting = false;
        cursor = null;
      } else {
        response.numberOfClones = response.numberOfClones + clones.docs.length;

        const batch = firestoreAdmin.batch();

        clones.docs.forEach((doc: any) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        keepDeleting = true;
        cursor = '';
      }
    }

    if (response.numberOfClones) {
      response.clonesDeleted = true;
    }

    try {
      await firestoreAdmin
        .collection(collection)
        .doc(id)
        .delete();

      response = {
        status: RESPONSE_CODES.SUCCESS,
        message: 'I successfully deleted that and its clones for you',
        uidToDelete: id,
        numberOfClones: response.numberOfClones,
        clonesDeleted: response.clonesDeleted,
        wasDeleted: true,
      };
    } catch (error) {
      response = {
        status: RESPONSE_CODES.ERROR,
        message:
          'I had an error deleting that.  My function deleteDocument failed.',
        uidToDelete: id,
        numberOfClones: response.numberOfClones,
        clonesDeleted: response.clonesDeleted,
        wasDeleted: false,
      };
    }
  } catch (error) {
    stackdriver.report(error);
  }

  return response;
};

export default batchDeleteClonesAndDocument;
