import cloneCircle from './cloneCircle';
import { Context, ResolverMap } from '@myiworlds/types';
import { getDocumentById } from '../../../../services/firebase/firestore/queries';
import { ICloneCircleResponse } from './cloneCircleTypes';

export const resolvers: ResolverMap = {
  Mutation: {
    cloneCircle: async (
      _: null,
      args: {
        id: string;
      },
      context: Context,
    ) => {
      return cloneCircle(args.id, context);
    },
  },
  CloneCircleResponse: {
    clonedCircle: (response: ICloneCircleResponse, _: null, context: Context) =>
      response.clonedCircleId
        ? getDocumentById('circles', response.clonedCircleId, context)
        : null,
  },
};
