import { Context, ResolverMap, User } from '@myiworlds/types';
import { firestoreAdmin, stackdriver } from '@myiworlds/services';

const getUserByIdResolvers: ResolverMap = {
  Query: {
    getUserById: async (_: null, __: null, context: Context) => {
      try {
        const userDoc = await firestoreAdmin
          .doc(`users/${context.userId}`)
          .get();
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

export default getUserByIdResolvers;
