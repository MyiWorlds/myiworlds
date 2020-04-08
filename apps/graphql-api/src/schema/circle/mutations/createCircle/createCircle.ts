import createDocument from './../../../../services/firebase/firestore/mutations/createDocument';
import { Circle, Context } from '@myiworlds/types';

export default async function createCircle(circle: Circle, context: Context) {
  if (!context.selectedProfileId) {
    return null;
  }

  if (!circle.owner) {
    circle.owner = context.selectedProfileId;
  }

  circle.creator = context.selectedProfileId;

  return createDocument(circle, context);
}
