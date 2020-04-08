import getProfileByUsername from './getProfileByUsername';
import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

const getProfileByUsernameQuery = {
  name: 'GetProfileByUsername',
  type: new GraphQLObjectType({
    name: 'GetProfileByUsernamePayload',
    fields: {
      usernameAvailable: { type: GraphQLBoolean },
      usernameInvalid: { type: GraphQLBoolean },
    },
  }),
  args: {
    username: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: (query: null, args: { username: string }) =>
    getProfileByUsername(args.username),
};

export default getProfileByUsernameQuery;
