import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentsByIds } from '../../../../services/firebase/firestore/queries';
import { stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    getProfilesByIds: async (
      _: null,
      args: { ids: string[] },
      context: Context,
    ) => {
      if (args.ids.length && context.validated) {
        try {
          const profiles = await getDocumentsByIds(
            'profiles',
            args.ids,
            context,
          );

          return profiles;
        } catch (error) {
          stackdriver.report(error);
          return [];
        }
      } else {
        return [];
      }
    },
  },
};
