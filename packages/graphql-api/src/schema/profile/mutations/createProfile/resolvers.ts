import buildAndCreateProfile from './buildAndCreateProfile';
import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Mutation: {
    createProfile: async (
      _: null,
      args: {
        username: string;
      },
      context: Context,
    ) => buildAndCreateProfile(args.username, context),
  },
  CreateProfileResponse: {
    createdProfile: async (response: any, _: null, context: Context) =>
      getDocumentById('profiles', response.createdDocumentId, context),
  },
};
