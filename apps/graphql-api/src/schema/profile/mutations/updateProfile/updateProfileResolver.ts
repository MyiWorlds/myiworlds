import updateProfile from './updateProfile';
import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

const updateProfileResolver: ResolverMap = {
  Mutation: {
    updateProfile: async (
      _: null,
      args: {
        id: string;
        data: any;
      },
      context: Context
    ) =>
      updateProfile(
        args.id,
        args.data.username,
        args.data.isDarkTheme,
        args.data.overrideCircleTypes,
        args.data.addToHistory,
        context
      )
  },
  UpdateProfileResponse: {
    updatedProfile: async (response: any, _: null, context: Context) =>
      getDocumentById('profiles', response.updatedDocumentId, context)
  }
};

export default updateProfileResolver;
