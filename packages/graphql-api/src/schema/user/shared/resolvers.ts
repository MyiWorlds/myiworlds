import { Context, ResolverMap } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';
import {
  getDocumentsByIds,
  getDocumentById,
} from '../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  User: {
    levelTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.levelTotal, context),

    balanceTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.balanceTotal, context),

    ratingTotal: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.ratingTotal, context),

    allMyThemes: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.allMyThemes, context),

    allMyTypeStyles: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.allMyTypeStyles, context),

    inbox: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.inbox, context),

    search: async (user: any, _: null, context: Context) =>
      getDocumentById('circles', user.search, context),

    selectedProfile: async (user: any, _: null, context: Context) =>
      getDocumentById('profiles', user.selectedProfile, context),

    profiles: async (user: any, _: null, context: Context) => {
      try {
        return await getDocumentsByIds('profiles', user.profiles, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
