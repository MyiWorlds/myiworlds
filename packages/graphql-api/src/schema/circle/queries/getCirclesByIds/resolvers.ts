import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentsByIds } from '../../../../services/firebase/firestore/queries';
import { stackdriver } from '@myiworlds/cloud-services';

export const resolvers: ResolverMap = {
  Query: {
    getCirclesByIds: async (
      _: null,
      args: { ids: string[] },
      context: Context,
    ) => {
      try {
        return await getDocumentsByIds('circles', args.ids, context);
      } catch (error) {
        stackdriver.report(error);
        return null;
      }
    },
  },
};
