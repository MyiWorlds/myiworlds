import { Context, ResolverMap } from '@myiworlds/types';
import { firestore, stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    getProfileById: async (_: null, args: { id: string }, context: Context) => {
      if (args.id !== 'null' && context.validated) {
        try {
          const profileDoc = await firestore.doc(`profiles/${args.id}`).get();
          const profile = profileDoc.data();

          return profile;
        } catch (error) {
          stackdriver.report(error);
          return null;
        }
      } else {
        return null;
      }
    },
  },
};
