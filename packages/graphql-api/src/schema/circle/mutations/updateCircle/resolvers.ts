import updateCircle from './updateCircle';
import { Circle, Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';

export const resolvers: ResolverMap = {
  Mutation: {
    updateCircle: async (
      _: null,
      args: { circle: Circle; merge: boolean },
      context: Context,
    ) => {
      return updateCircle(args.circle, args.merge, context);
    },
  },
  UpdateCircleResponse: {
    updatedCircle: async (response: any, _: null, context: Context) =>
      getDocumentById('circles', response.updatedDocumentId, context),
    creator: async (response: any, _: null, context: Context) =>
      getDocumentById('users', response.contextProfileId, context),
  },
};
