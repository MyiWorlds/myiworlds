import { Context } from '@myiworlds/types';
import {
  isCreator,
  isEditor,
  isPublic,
  isRequestingUser,
  isUser
  } from '.';

export const userCanView = (document: any, context: Context) => {
  if (isPublic(document.public)) {
    return true;
  }

  if (context) {
    const { userId, selectedProfileId } = context;

    if (selectedProfileId) {
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
