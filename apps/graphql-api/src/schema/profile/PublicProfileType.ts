import CircleType from '../circle/CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const PublicProfileType = new GraphQLObjectType({
  name: 'Public Profile',
  description: 'The publicProfile in which other publicProfiles can access.  Has fields removed from publicProfile others should not be able to see.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    theme: {
      type: CircleType,
      resolve: async (publicProfile, args, context: Context) => {
        if (publicProfile.theme) {
          return context.circleLoader.load(publicProfile.theme);
        }
        return null;
      },
    },
    publicHome: {
      type: CircleType,
      resolve: async (publicProfile, args, context: Context) => {
        if (publicProfile.publicHome) {
          return context.circleLoader.load(publicProfile.publicHome);
        }
        return null;
      },
    },
  }),
});

export default PublicProfileType;
