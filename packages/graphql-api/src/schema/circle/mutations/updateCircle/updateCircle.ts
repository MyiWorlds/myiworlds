import { Circle, Context } from '@myiworlds/types';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';

const updateCircle = (circle: Circle, merge: boolean, context: Context) =>
  updateDocumentById(circle, context, merge);

export default updateCircle;
