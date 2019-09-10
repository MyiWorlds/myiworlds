import { Context, ResolverMap, User } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { updateDocumentById } from '../../../../services/firebase/firestore/mutations';

export const resolvers: ResolverMap = {
  Mutation: {
    updateUser: async (
      _: null,
      args: { user: User; merge: boolean },
      context: Context,
    ) => {
      return updateDocumentById(args.user, context, args.merge);
    },
  },
  UpdateCircleResponse: {
    updatedCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.updatedDocumentId, context),
  },
};
