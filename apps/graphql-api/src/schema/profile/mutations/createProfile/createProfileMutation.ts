import buildAndCreateProfile from './buildAndCreateProfile';
import { Context } from '@myiworlds/types';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

const createProfileMutation = {
  name: 'CreateProfile',
  args: {
    username: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (_: null, args: { username: string }, context: Context) =>
    buildAndCreateProfile(args.username, context),
  type: new GraphQLObjectType({
    name: 'CreateProfilePayload',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
      createdDocumentId: { type: GraphQLString },
    }),
  }),
};

export default createProfileMutation;
