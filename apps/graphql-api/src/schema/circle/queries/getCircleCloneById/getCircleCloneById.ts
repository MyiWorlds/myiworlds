import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

const getCircleCloneById = async (id: string, context: Context) =>
  getDocumentById(FIRESTORE_COLLECTIONS.CIRCLES_CLONES, id, context);

export default getCircleCloneById;
