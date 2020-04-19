import CircleType from '../../CircleType';
import copyCircle from './copyCircle';
import getDocumentById from '../../../../services/firebase/firestore/queries/getDocumentById';
import { Context } from '@myiworlds/types';
import { CopyCircleResponse } from './copyCircleTypes';
import { FIRESTORE_COLLECTIONS } from '@myiworlds/enums';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const copyCircleMutation = {
  name: 'CopyCircle',
  args: {
    circleIdToCopy: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (
    _: null,
    args: {
      circleIdToCopy: string;
    },
    context: Context,
  ) => {
    return copyCircle(args.circleIdToCopy, context);
  },
  type: new GraphQLObjectType({
    name: 'CopyCirclePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      CircleHydrated: {
        type: CircleType,
        resolve: async (response: CopyCircleResponse, context: Context) => {
          if (response.createdDocumentId) {
            return getDocumentById(
              FIRESTORE_COLLECTIONS.CIRCLES,
              response.createdDocumentId,
              context,
            );
          } else {
            return null;
          }
        },
      },
    }),
  }),
};

export default copyCircleMutation;
