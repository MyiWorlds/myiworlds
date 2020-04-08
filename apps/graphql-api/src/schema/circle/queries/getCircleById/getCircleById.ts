import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

const getCircleById = async (id: string, context: Context) =>
  getDocumentById(FIRESTORE_COLLECTIONS.CIRCLES, id, context);

export default getCircleById;
