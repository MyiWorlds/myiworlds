import deleteCircle from './deleteCircle';
import { Context } from '@myiworlds/types';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const deleteCircleMutation = {
  name: 'Delete Circe Mutation',
  resolve: (_: null, args: null, context: Context) => deleteCircle(context),
  type: new GraphQLObjectType({
    name: 'DeleteCirclePayload',
    fields: () => ({
      status: { type: GraphQLNonNull(GraphQLString) },
      message: { type: GraphQLNonNull(GraphQLString) },
      userDeleted: { type: GraphQLNonNull(GraphQLBoolean) }
    }),
  }),
};

export default deleteCircleMutation;
