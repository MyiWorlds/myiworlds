import { Context } from '@myiworlds/types';
import { isCreator } from './isCreator';
import { isEditor } from './isEditor';
import { isPublic } from './isPublic';
import { isRequestingUser } from './isRequestingUser';
import { isUser } from './isUser';

export const userCanView = (document: any, context: Context) => {
  if (isPublic(document.public)) {
    return true;
  }

  if (context) {
    const { userId, selectedProfileId } = context;

    if (userId && selectedProfileId) {
      return (
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
