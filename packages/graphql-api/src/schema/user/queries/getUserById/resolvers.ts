import { Context, ResolverMap } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    user: async (_: null, __: null, context: Context) => {
      try {
        const userDoc = await firestore.doc(`users/${context.userId}`).get();
        // const user = userDoc.data() as User | undefined;
        const user = userDoc.data();
        return user;
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
