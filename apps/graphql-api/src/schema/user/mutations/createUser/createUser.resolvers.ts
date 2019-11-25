import createUser from './createUser';
import { CreateUserResponse } from './createUser';
import { firestoreAdmin } from '@myiworlds/services';
import { ResolverMap } from '@myiworlds/types';

const createUserResolver: ResolverMap = {
  Mutation: {
    createUser: async (
      _: null,
      args: {
        id: string;
        email: string;
        photoURL: string | null;
      },
    ) => createUser(args.id, args.email, args.photoURL),
  },
  CreateUserResponse: {
    createdUser: async (response: CreateUserResponse) => {
      if (response.createdDocumentId) {
        const createdUser = await firestoreAdmin
          .collection('users')
          .doc(response.createdDocumentId)
          .get();
        return createdUser.data();
      } else {
        return null;
      }
    },
  },
};

export default createUserResolver;
