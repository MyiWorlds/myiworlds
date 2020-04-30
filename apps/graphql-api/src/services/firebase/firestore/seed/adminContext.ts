import { Context } from '@myiworlds/types';
import { googleCloud } from '@myiworlds/credentials';

export const context: Context = {
  userId: googleCloud.applicationCreatorUser,
  selectedProfileId: googleCloud.applicationCreatorProfile,
  addToHistory: true,
  profileHistoryId: null,
  circleLoader: null,
  circleCloneLoader: null,
  profileLoader: null,
  profileCloneLoader: null,
  isSystemAdmin: true,
};
