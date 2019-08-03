import createUser from './createUser';
import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Mutation: {
    createUser: async (
      _: null,
      args: {
        id: string;
        email: string;
      },
      context: Context,
    ) => createUser(args.id, args.email, context),
  },
  CreateUserResponse: {
    createdUser: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.createdDocumentId, context),
  },
};
