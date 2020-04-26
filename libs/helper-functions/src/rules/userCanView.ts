import { Context } from '@myiworlds/types';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { isCreator } from './isCreator';
import { isEditor } from './isEditor';
import { isOwner } from './isOwner';
import { isPublic } from './isPublic';
import { isRequestingUser } from './isRequestingUser';
import { isUser } from './isUser';

export const userCanView = (document: any, context: Context) => {
  // Profiles are public by nature, fields may be hidden from public
  // But that is handled by the GraphQL Schema
  const isProfile =
    document.collection === FIRESTORE_COLLECTIONS.PROFILES ||
    document.collection === FIRESTORE_COLLECTIONS.PROFILES_CLONES;
  if (isPublic(document) || isProfile) {
    return true;
  }

  if (context) {
    const { userId, selectedProfileId } = context;

    if (userId && selectedProfileId) {
      return (
        isOwner(document.owner, selectedProfileId) ||
        isCreator(document.creator, selectedProfileId) ||
        isEditor(document.editors, selectedProfileId) ||
        isUser(document.users, selectedProfileId) ||
        isRequestingUser(document.id, userId) ||
        isRequestingUser(document.userId, userId)
      );
    } else if (userId) {
      return (
        isRequestingUser(document.id, userId) ||
        isRequestingUser(document.userId, userId)
      );
    }
  }
  return false;
};
