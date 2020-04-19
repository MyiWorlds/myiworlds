import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';

const getPublicProfileById = async (id: string, context: Context) =>
  getDocumentById(FIRESTORE_COLLECTIONS.PROFILES, id, context);

export default getPublicProfileById;
