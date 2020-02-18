import addToEdge from './addToEdge';
import {
  Circle,
  CircleClone,
  Context,
  PublicProfile,
  PublicProfileClone,
} from '@myiworlds/types';

const addToProfileHistory = (
  interactionType: string,
  document: Circle | PublicProfile | CircleClone | PublicProfileClone,
  context: Context,
) => {
  if (context.userId && context.profileHistoryId) {
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
