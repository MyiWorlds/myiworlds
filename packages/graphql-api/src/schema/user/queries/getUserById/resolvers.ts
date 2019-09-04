import { Context, ResolverMap, User } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    getUserById: async (_: null, __: null, context: Context) => {
      try {
        const userDoc = await firestore.doc(`users/${context.userId}`).get();
        if (userDoc.exists) {
          const user = userDoc.data();
          return user as User;
        }
        return null;
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
