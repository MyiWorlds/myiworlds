import copyCircle from './copyCircle';
import { Context } from '@myiworlds/types';
import { CopyCircleResponse } from './copyCircleTypes';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const copyCircleMutation = {
  name: 'CopyCircle',
  args: {
    id: { type: GraphQLNonNull(GraphQLString) },
    collection: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (
    _: null,
    args: {
      id: string;
      collection: 'circles' | 'circles-clones';
    },
    context: Context,
  ) => {
    return copyCircle(args.id, args.collection, context);
  },
  type: new GraphQLObjectType({
    name: 'CopyCirclePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      copiedCircleId: {
        type: GraphQLString,
        resolve: async (response: CopyCircleResponse) => {
          return response.createdDocumentId;
        },
      },
    }),
  }),
};

export default copyCircleMutation;
