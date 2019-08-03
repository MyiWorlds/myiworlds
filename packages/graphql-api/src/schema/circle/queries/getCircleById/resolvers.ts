import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Query: {
    getCircleById: async (_: null, args: { id: string }, context: Context) =>
      getDocumentById('circles', args.id, context),
  },
};
