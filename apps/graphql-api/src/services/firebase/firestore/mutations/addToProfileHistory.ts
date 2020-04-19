import addToEdge from './addToEdge';
import { Circle, CircleClone, Context } from '@myiworlds/types';

const addToProfileHistory = (
  interactionType: string,
  document: Circle | CircleClone,
  context: Context,
) => {
  if (context.userId && context.profileHistoryId && document) {
    addToEdge(
      context.profileHistoryId,
      [interactionType],
      document,
      true,
      context,
    );
    return;
  } else {
    return;
  }
};

export default addToProfileHistory;
