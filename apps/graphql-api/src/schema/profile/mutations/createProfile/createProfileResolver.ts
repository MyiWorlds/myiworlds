import buildAndCreateProfile from './buildAndCreateProfile';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context, ResolverMap } from '@myiworlds/types';

const createProfileResolver: ResolverMap = {
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

export default createProfileResolver;
