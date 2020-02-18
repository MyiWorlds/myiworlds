import CircleType from './../circle/CircleType';
import { Context } from '@myiworlds/types';
import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from 'graphql';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GraphQLBigInt = require('graphql-bigint');

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'user who can create and interact with circles.',

  fields: () => ({
    id: { type: GraphQLString },
    collection: { type: GraphQLString },
    username: { type: GraphQLString },
    dateCreated: { type: GraphQLBigInt },
    dateUpdated: { type: GraphQLBigInt },
    addToHistory: { type: GraphQLBoolean },
    theme: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.creator) {
          return context.circleLoader.load(profile.publicProfile);
        }
        return null;
      },
    },
    publicProfile: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.creator) {
          return context.circleLoader.load(profile.publicProfile);
        }
        return null;
      },
    },
    home: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.creator) {
          return context.circleLoader.load(profile.publicProfile);
        }
        return null;
      },
    },
    history: {
      type: CircleType,
      resolve: async (profile, args, context: Context) => {
        if (profile.creator) {
          return context.circleLoader.load(profile.history);
        }
        return null;
      },
    },
  }),
});

export default ProfileType;
