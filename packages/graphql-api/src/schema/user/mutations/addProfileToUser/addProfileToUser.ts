import { firestore, stackdriver } from '@myiworlds/cloud-services';
import { ResolverMap } from '@myiworlds/types';

export const resolvers: ResolverMap = {
  Mutation: {
    createUser: async (
      _: null,
      args: {
        id: string;
        email: string;
      },
    ) => {
      try {
        const user = {
          id: args.id,
          dateCreated: Date.now(),
          dateUpdated: Date.now(),
          email: args.email,
        };

        await firestore
          .collection('users')
          .doc(user.id)
          .set(user);

        const createUserResponse = {
          status: 'SUCCESS',
          createdUser: user.id,
        };

        return createUserResponse;
      } catch (error) {
        stackdriver.report(error);
        return;
      }
    },
  },
};
