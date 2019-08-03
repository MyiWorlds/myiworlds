import { Circle, Context } from '@myiworlds/types';
import { createDocument } from '../../../../services/firebase/firestore/mutations';

export default async function createCircle(
  documentToCreate: Circle,
  context: Context,
) {
  if (!documentToCreate.owner) {
    documentToCreate.owner = context.selectedProfileId;
  }

  documentToCreate.creator = context.selectedProfileId;

  return createDocument(documentToCreate, context);
}
